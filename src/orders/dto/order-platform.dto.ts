import { IsNotEmpty } from 'class-validator';

export class OrderPlatform {
  @IsNotEmpty()
  platforms: string[];
}
