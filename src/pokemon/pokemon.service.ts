import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';
import axios from 'axios';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async onModuleInit() {
    // Agregar algunos registros iniciales
    const initialPokemon = [
      { name: 'Bulbasaur', weight: 6.9 },
      { name: 'Charmander', weight: 8.5 },
      { name: 'Squirtle', weight: 9.0 },
    ];

    for (const pokemon of initialPokemon) {
      const newPokemon = this.pokemonRepository.create(pokemon);
      await this.pokemonRepository.save(newPokemon);
    }
  }

  findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  findOneById(id: number): Promise<Pokemon> {
    return this.pokemonRepository.findOne({ where: { id } });
  }

  findOneByName(name: string): Promise<Pokemon> {
    return this.pokemonRepository.findOne({ where: { name } });
  }

  async create(pokemon: Partial<Pokemon>): Promise<Pokemon> {
    const newPokemon = this.pokemonRepository.create(pokemon);
    return this.pokemonRepository.save(newPokemon);
  }

  async getPokemonFromPokeApi(name: string): Promise<any> {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    return response.data;
  }
}
