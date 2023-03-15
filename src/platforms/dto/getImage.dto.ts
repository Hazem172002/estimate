import { IsNotEmpty } from 'class-validator';

export class getImageDto {
  @IsNotEmpty()
  link: string;
}
