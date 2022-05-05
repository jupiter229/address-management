import { Controller, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { Body, Post, Request, UseGuards, Query } from '@nestjs/common';
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
    if (address) {
      return {
        address: address.address,
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Ops, an error occurred, please try again later',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getAddresses(@Request() req, @Query() query) {
    const { page = 1 } = query;
    return this.addressService.getAddresses(req.user.id, { page });
  }
}
