import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    createWallet(req: any): Promise<{
        id: any;
    }>;
    getAssets(req: any, params: any): Promise<any[]>;
    getSupportedAssets(): Promise<any>;
}
