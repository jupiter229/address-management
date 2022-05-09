import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from './schema/address.schema';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create.address.dto';
import { AuthDocument, Auth } from '../authentication/schemas/auth.schema';
import {
  assets as cryptoassets,
  chains,
  currencyToUnit,
} from '@liquality/cryptoassets';
import { isEthereumChain } from '../network-client/utils/asset';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../authentication/authentication.service';
import { NetworkClientService } from '../network-client/network-client.service';
import { TransferAssetsDto } from './dto/transfer.assets.dto';
import BN from 'bignumber.js';
@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private addressDocumentModel: Model<AddressDocument>,
    @InjectModel(Auth.name) private authDocumentModel: Model<AuthDocument>,
    private readonly authenticationService: AuthenticationService,
    private readonly networkClientService: NetworkClientService,
    private configService: ConfigService,
  ) {}

  async generateAddress(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<AddressDocument> {
    const assetData = cryptoassets[createAddressDto.code];

    if (assetData) {
      const user = await this.authDocumentModel.findById(userId);
      const existingAddress = await this.addressDocumentModel
        .findOne({
          asset: createAddressDto.code,
          user,
        })
        .sort({ derivationIndex: -1 });
      const derivationIndex = existingAddress
        ? existingAddress.derivationIndex + 1
        : 0;
      const seedPhrase = this.configService.get('MNEMONIC');

      const networkClient = this.networkClientService.createClient(
        createAddressDto.code,
        seedPhrase,
        derivationIndex,
      );
      const rawAddresses = await networkClient.wallet.getAddresses();

      const result = rawAddresses[0];
      const rawAddress = isEthereumChain(createAddressDto.code)
        ? result.address.replace('0x', '')
        : result.address;

      const formattedAddress =
        chains[cryptoassets[createAddressDto.code]?.chain]?.formatAddress(
          rawAddress,
        );

      const address = await this.saveNewAddress(userId, {
        ...createAddressDto,
        address: formattedAddress,
        derivationIndex,
      });

      if (address) {
        return address;
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'Asset is not supported, please check the asset parameters and try again',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private async saveNewAddress(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<AddressDocument> {
    const existingAddress = await this.addressDocumentModel.findOne({
      address: createAddressDto.address,
      asset: createAddressDto.code,
    });
    if (existingAddress) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Address has been added already',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const user = await this.authDocumentModel.findById(userId);
      if (user) {
        return this.addressDocumentModel.create({
          address: createAddressDto.address,
          asset: createAddressDto.code,
          derivationIndex: createAddressDto.derivationIndex,
          user,
        });
      }
    }
  }

  validateNewAddressChain(chain: string) {
    const validAssetChains = ['ethereum', 'bitcoin', 'bsc'];
    if (validAssetChains.indexOf(chain.toLowerCase()) === -1) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unsupported asset chain',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAddresses(userId: string, queryOptions) {
    const user = await this.authDocumentModel.findById(userId);
    const options = {
      ...queryOptions,
      select: 'address asset',
      limit: parseInt(process.env.PAGINATION_LIMIT),
      //sort: { date: -1 },
      collation: {
        locale: 'en',
      },
    };
    // @ts-ignore
    return this.addressDocumentModel.paginate({ user }, options);
  }
  async transferAsset(
    userId: string,
    addressId: string,
    transferAssetsDto: TransferAssetsDto,
  ) {
    const existingAddress = await this.getExistingAddress(addressId);
    const seedPhrase = this.configService.get('MNEMONIC');
    const client = this.networkClientService.createClient(
      transferAssetsDto.code,
      seedPhrase,
      existingAddress.derivationIndex,
    );
    // @ts-ignore
    const originalEstimateGas = client._providers[0].estimateGas;

    // if (gas) {
    //   client._providers[0].estimateGas = async () => {
    //     return gas;
    //   };
    // }

    const amount = currencyToUnit(
      cryptoassets[transferAssetsDto.code],
      transferAssetsDto.amount,
    ).toNumber();

    const fees = await client.chain.getFees();
    const selectedSpeed = 'fast';

    let tx;
    try {
      tx = await client.chain.sendTransaction({
        to: transferAssetsDto.to,
        value: new BN(amount),
        data: undefined,
        fee: fees[selectedSpeed].fee,
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      // @ts-ignore
      client._providers[0].estimateGas = originalEstimateGas;
    }

    return {
      hash: tx,
      message: 'Transaction has been initiated',
    };
  }
  private async getExistingAddress(addressId: string) {
    const existingAddress = await this.addressDocumentModel.findById(addressId);
    if (existingAddress) {
      return existingAddress;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Wallet address does not exist',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  async getAssets(userId: string, addressId: string) {
    return [
      { asset: 'ETH', amount: 1.2 },
      { asset: 'BTC', amount: 0.2 },
      { asset: 'BNB', amount: 0.3 },
    ];
    // const assets = ['BBTC', 'BETH'];
    const existingAddress = await this.getExistingAddress(addressId);
    const seedPhrase = this.configService.get('MNEMONIC');
    const networkClient = this.networkClientService.createClient(
      existingAddress.asset,
      seedPhrase,
      existingAddress.derivationIndex,
    );
    const addresses = await networkClient.wallet.getUsedAddresses();
    const balance =
      addresses.length === 0
        ? 0
        : (
            await networkClient.chain.getBalance([
              {
                address: '0xA75EDE99F376Dd47f3993Bc77037F61b5737C6EA',
              },
            ])
          ).toNumber();

    return {
      asset: existingAddress.asset,
      balance,
    };
  }
}
