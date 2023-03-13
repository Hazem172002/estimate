import { IsNotEmpty } from 'class-validator';

export class Platform {
  @IsNotEmpty()
  platformId: string[];
}
