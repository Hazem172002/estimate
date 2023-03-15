import { IsNotEmpty, IsString } from 'class-validator';
export class OrderFoundations {
  @IsNotEmpty()
  orderId: string;
  @IsNotEmpty()
  foundationIds: [];
}
