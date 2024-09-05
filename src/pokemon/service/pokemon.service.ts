import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../model/entity/pokemon.entity';
import axios from 'axios';
import { CreatePokemonDTO } from '../model/dto/pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async onModuleInit() {
    // Agregar algunos registros iniciales
    const initialPokemon = [
      {
        name: 'bulbasaur',
        available: true,
        account_created: 'dortiz',
        weight: 69,
        height: 100,
        base_experience: 1002,
      },
      {
        name: 'charmander',
        available: true,
        account_created: 'dortiz',
        weight: 85,
        height: 200,
        base_experience: 2004,
      },
      {
        name: 'squirtle',
        available: true,
        account_created: 'dortiz',
        weight: 90,
        height: 300,
        base_experience: 3409,
      },
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

  async create(pokemonDTO: Partial<CreatePokemonDTO>): Promise<Pokemon> {
    const pokemonEntity = new Pokemon();
    pokemonEntity.name = pokemonDTO.name;
    pokemonEntity.available = pokemonDTO.available;
    pokemonEntity.account_created = pokemonDTO.account_created;

    try {
      const pokemonData = await this.getPokemonFromPokeApi(pokemonDTO.name);
      if (pokemonData) {
        pokemonEntity.weight = pokemonData.weight;
        pokemonEntity.height = pokemonData.height;
        pokemonEntity.base_experience = pokemonData.base_experience;
      } else {
        pokemonEntity.weight = null;
        pokemonEntity.height = null;
        pokemonEntity.base_experience = null;
      }
    } catch (error) {
      pokemonEntity.weight = null;
      pokemonEntity.height = null;
      pokemonEntity.base_experience = null;
    }

    const newPokemon = this.pokemonRepository.create(pokemonEntity);
    return this.pokemonRepository.save(newPokemon);
  }

  async getPokemonFromPokeApi(name: string): Promise<any> {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    );
    return response.data;
  }
}
