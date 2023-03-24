import { IsNotEmpty, IsString } from 'class-validator';
export class OrderIdDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;
}
