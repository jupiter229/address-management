import { WalletDocument } from './schema/wallet.schema';
import { Model } from 'mongoose';
import { AuthDocument } from '../authentication/schemas/auth.schema';
import { CryptoAssetService } from '../network-client/crypto.asset.service';
import { ConfigService } from '@nestjs/config';
import { NetworkClientService } from '../network-client/network-client.service';
export declare class WalletService {
    private walletDocumentModel;
    private authDocumentModel;
    private readonly cryptoAssetService;
    private readonly configService;
    private readonly networkClientService;
    constructor(walletDocumentModel: Model<WalletDocument>, authDocumentModel: Model<AuthDocument>, cryptoAssetService: CryptoAssetService, configService: ConfigService, networkClientService: NetworkClientService);
    createWallet(userId: string): Promise<{
        id: any;
    }>;
    getSupportedAssets(): any;
    getAssets(walletId: string): Promise<any[]>;
    generateAddress(code: string, derivationIndex: number): Promise<any>;
    private getCustomAsset;
}
