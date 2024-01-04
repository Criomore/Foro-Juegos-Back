import { IsString, IsEmail, IsDate, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()

  country: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}
