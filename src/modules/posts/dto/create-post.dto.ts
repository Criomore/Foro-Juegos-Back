import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  resource: string

  @IsDate()
  creationDate: Date

  @IsString()
  owner: string

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  tags: string

  @IsBoolean()
  @IsOptional()
  spoiler: boolean
}
