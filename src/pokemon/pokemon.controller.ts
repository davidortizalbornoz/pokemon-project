import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';

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
  async create(@Body() pokemonData: Partial<Pokemon>): Promise<Pokemon> {
    return this.pokemonService.create(pokemonData);
  }

  @Get('pokeapi/:name')
  async getPokemonFromPokeApi(@Param('name') name: string): Promise<any> {
    try {
      const pokemonData = await this.pokemonService.getPokemonFromPokeApi(name);
      return pokemonData;
    } catch (error) {
      throw new HttpException(
        'Error fetching Pokemon from PokeAPI',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
