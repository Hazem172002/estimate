import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class OrderPlatform {
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  platforms: string[];
}
