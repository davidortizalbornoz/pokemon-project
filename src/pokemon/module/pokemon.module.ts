import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../model/entity/pokemon.entity';
import { PokemonController } from '../controller/pokemon.controller';
import { PokemonService } from '../service/pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
