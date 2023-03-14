import { IsNotEmpty, IsString } from 'class-validator';
export class Foundations {
  @IsNotEmpty()
  orderId: string;
  @IsNotEmpty()
  features: {};
}
