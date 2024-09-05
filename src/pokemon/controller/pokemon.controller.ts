import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../model/entity/pokemon.entity';
import { CreatePokemonDTO } from '../model/dto/pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get('/findOneById/:id')
  async findOneById(@Param('id') id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findOneById(id);
    if (!pokemon) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }
    return pokemon;
  }

  @Get('/findOneByName/:name')
  async findOneByName(@Param('name') name: string): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findOneByName(name);
    if (!pokemon) {
      throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
    }
    return pokemon;
  }

  @Post()
  async create(@Body() pokemonData: CreatePokemonDTO): Promise<Pokemon> {
    return this.pokemonService.create(pokemonData);
  }
}
