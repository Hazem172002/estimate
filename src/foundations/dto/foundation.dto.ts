import { IsNotEmpty } from 'class-validator';

export class Foundations {
  @IsNotEmpty()
  orderId: String;
}
