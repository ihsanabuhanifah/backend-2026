import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class LatihanDto {
  id: number;

  @IsNotEmpty()
  @Length(4, 10)
  title: string;

  @IsNotEmpty()
  @IsEmail()
  name: string;

  @IsNotEmpty()
  alamat: string;

  @IsNotEmpty()
  @IsInt() // year wajib number
  @Min(20) // minimal tahun adalah 2020
  @Max(40) //maksimal tahun adalah 2023
  umur: number;
}

export class CreateLatihanDto extends OmitType(LatihanDto, ["id"]) {}

