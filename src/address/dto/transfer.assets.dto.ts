import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransferAssetsDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
