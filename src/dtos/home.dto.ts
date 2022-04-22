import { IsNumber, IsNumberString, IsString, Min } from 'class-validator'

export class CreateHomeDto {
  @IsString()
  name: string

  @IsString()
  desc: string

  @IsNumberString()
  price: number

  @IsNumberString()
  post_code: string
}
