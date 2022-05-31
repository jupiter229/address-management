import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createWallet(@Request() req) {
    return this.walletService.createWallet(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:walletId/assets')
  async getAssets(@Request() req, @Param() params) {
    const { walletId } = params;
    const assets = ['BTC', 'ETH'];
    const result = [];

    const rawResult = await this.walletService.getAssets(walletId);
    for (const code of assets) {
      const singleRes = {
        code,
        chains: [],
      };
      for (const singleRawResult of rawResult) {
        if (singleRawResult.code.indexOf(code) > -1) {
          singleRes.chains.push(singleRawResult);
        }
      }
      result.push(singleRes);
    }
    return result;
  }

  @Get('/supported-assets')
  async getSupportedAssets() {
    return this.walletService.getSupportedAssets();
  }
}
