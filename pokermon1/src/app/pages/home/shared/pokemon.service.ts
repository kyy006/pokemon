import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  filter,
  from,
  map,
  tap,
  toArray,
} from 'rxjs';
import { Pokemon, PokemonResponse } from './pokemon.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  starterPokemon = ['Bulbasaur', 'Squirtle', 'Charmander'];

  pokemonList$ = new BehaviorSubject<Pokemon[]>([]);

  get pokemonList() {
    return this.pokemonList$.value;
  }
  constructor(private http: HttpClient) {}

  getPokemon() {
    return from(this.starterPokemon).pipe(
      concatMap((p) =>
        this.http.get<PokemonResponse>(this.baseUrl + p.toLowerCase())
      ),
      tap((pokemon) => {
        const newPokemon = {
          name: pokemon.forms[0].name,
          sprites: pokemon.sprites,
          id: pokemon.id,
          weight: pokemon.weight,
          height: pokemon.height,
          types: pokemon.types,
        };
        this.pokemonList$.next([...this.pokemonList, newPokemon]);
      })
    );
  }

  choosePokemon(pokemon: Pokemon) {
    // console.log('Choose Pokemon', pokemon);
    return this.pokemonList$.pipe(
      map((item) => item.filter((p) => p.id === pokemon.id))
    );
  }
}
