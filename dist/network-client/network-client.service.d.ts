import { Client } from '@liquality/client';
import { ConfigService } from '@nestjs/config';
export declare class NetworkClientService {
    private readonly configService;
    wallet: any;
    constructor(configService: ConfigService);
    private initWallet;
    createClient(asset: string, index?: number): Promise<Client>;
    getWallet(): any;
    private addCustomToken;
}
