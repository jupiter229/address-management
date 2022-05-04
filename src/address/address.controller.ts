import { Controller } from '@nestjs/common';
import { AddressService } from './address.service';
import { Body, Post, Request, UseGuards } from '@nestjs/common';
import { CreateAddressDto } from './dto/create.address.dto';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}
  @UseGuards(JwtAuthGuard)
  @Post('')
  async generateNewAddress(
    @Body() createAddressDto: CreateAddressDto,
    @Request() req,
  ) {
    this.addressService.validateNewAddressChain(createAddressDto.chain);

    const address = await this.addressService.generateAddress(
      req.user.id,
      createAddressDto,
    );

    return {
      address: address.address,
    };
  }
}
