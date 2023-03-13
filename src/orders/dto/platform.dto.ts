import { IsNotEmpty } from 'class-validator';

export class Platform {
  @IsNotEmpty()
  platformId: string[];
}

export class Foundations {
  @IsNotEmpty()
  OrderId: string[];
}
