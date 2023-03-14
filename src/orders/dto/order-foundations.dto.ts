import { Foundations } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
export class OrderFoundations {
  @IsNotEmpty()
  orderId: string;
  @IsNotEmpty()
  foundationsBody: (Foundations & { hours: number; price: number })[];
}
