import { IsNotEmpty } from 'class-validator';
export class Functionalities {
  @IsNotEmpty()
  orderId: string;
  @IsNotEmpty()
  functionalitiesBody: {};
}
