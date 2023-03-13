import { IsNotEmpty } from 'class-validator';

export class Orders {
  @IsNotEmpty()
  orderId: string[];
}
