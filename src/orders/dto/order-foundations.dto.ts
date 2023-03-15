import { Foundations } from '@prisma/client';
import { IsNotEmpty, IsArray, ArrayMinSize, IsString } from 'class-validator';
export class OrderFoundations {
  @IsNotEmpty()
  @IsString()
  orderId: string;
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  foundationIds: string[];
}
