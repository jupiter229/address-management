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
    return this.walletService.getAssets(walletId);
  }

  @Get('/supported-assets')
  async getSupportedAssets() {
    return this.walletService.getSupportedAssets();
  }
}
