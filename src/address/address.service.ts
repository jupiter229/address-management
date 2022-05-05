import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from './schema/address.schema';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create.address.dto';
import { AuthDocument, Auth } from '../authentication/schemas/auth.schema';
import { assets as cryptoassets, chains } from '@liquality/cryptoassets';
import { isEthereumChain } from '../network-client/utils/asset';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../authentication/authentication.service';
import { NetworkClientService } from '../network-client/network-client.service';

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
}
