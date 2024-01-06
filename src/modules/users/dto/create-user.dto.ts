import {
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from 'class-validator'

export class CreateUserDto {
  @IsString({ message: 'Deberia ser un texto' })
  @IsNotEmpty({ message: 'El campo "Nombre de usuario" es obligatorio' })
  userName: string

  @IsEmail()
  @IsNotEmpty({ message: 'El campo "Email" es obligatorio' })
  email: string

  @IsString({ message: 'Deberia ser un texto' })
  @IsNotEmpty({ message: 'El campo "Contraseña" es obligatorio' })
  password: string

  @IsString({ message: 'Deberia ser un texto' })
  @IsNotEmpty({ message: 'El campo "Pais" es obligatorio' })
  country: string

  @IsDateString()
  @IsNotEmpty({ message: 'El campo "Fecha de nacimiento" es obligatorio' })
  birthDate: Date

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests: string

  @IsString({ message: 'Deberia ser un texto' })
  @IsNotEmpty({ message: 'El campo "Avatar" es obligatorio' })
  avatar: string
}
