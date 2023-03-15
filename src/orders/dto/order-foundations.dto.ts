import { Foundations } from '@prisma/client';
import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
export class OrderFoundations {
  @IsNotEmpty()
  orderId: string;
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  foundationIds: string[];
}
