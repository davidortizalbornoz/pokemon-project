import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePokemonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsString()
  @IsNotEmpty()
  account_created: string;
}
