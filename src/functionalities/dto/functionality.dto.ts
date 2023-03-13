import { IsNotEmpty } from 'class-validator';

export class Functionality {
  @IsNotEmpty()
  orderId: String;
}
