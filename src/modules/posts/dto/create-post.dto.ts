import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { User } from 'src/modules/users/entities/user.entity'

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

  @IsString({message: 'Deberia ser un texto'})
  owner: User

  @IsArray()
  @IsString({each: true, message: 'Deberia ser un texto'})
  @IsOptional()
  tags: string

  @IsBoolean()
  @IsOptional()
  spoiler: boolean
}
