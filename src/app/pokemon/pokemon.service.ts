import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon } from "./pokemon.interface";

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.baseUrl}${name.toLowerCase()}`)
      .pipe(
        map(response => this.transformResponseToPokemon(response)),
        catchError(error => throwError('Error in fetching Pokemon: ' + error))
      );
  }

  private transformResponseToPokemon(response: any): Pokemon {
    return {
      name: response.name,
      id: response.id,
      weight: response.weight,
      height: response.height,
      types: response.types.map((t: any) => t.type.name),
      image: response.sprites.other['official-artwork'].front_default,
    };
  }
}
