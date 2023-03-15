import { Functionalities } from '@prisma/client';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
export class OrderFunctionalities {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  functionalitiesIDs: string[];
}
