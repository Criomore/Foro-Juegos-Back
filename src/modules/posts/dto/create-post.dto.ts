import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @IsString({message: 'Deberia ser un texto'})
  @IsNotEmpty({message: 'El campo "Titulo" es obligatorio'})
  title: string

  @IsString({message: 'Deberia ser un texto'})
  @IsOptional()
  description: string

  @IsString({message: 'Deberia ser un texto'})
  @IsOptional()
  resource: string

  @IsDateString()
  creationDate: Date

  @IsString({message: 'Deberia ser un texto'})
  owner: string

  @IsArray()
  @IsString({each: true, message: 'Deberia ser un texto'})
  @IsOptional()
  tags: string

  @IsBoolean()
  @IsOptional()
  spoiler: boolean
}
