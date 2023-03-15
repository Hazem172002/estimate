import { Functionalities } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
export class OrderFunctionalities {
  @IsNotEmpty()
  orderId: string;
  // @IsNotEmpty()
  // functionalitiesBody: (Functionalities & { hours: number; price: number })[];
  @IsNotEmpty()
  functionalitiesIDs: string[];
}
