import { Component } from '@angular/core';
import { PokemonService } from '../../shared/pokemon.service';
import { Pokemon } from '../../shared/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  pokemonLists: Pokemon[] = [];
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemon().subscribe();

    this.pokemonService.pokemonList$.subscribe((pokemonList) => {
      console.log(pokemonList);
      this.pokemonLists = pokemonList;
    });
  }

  onPokemonClick(pokemon: Pokemon) {
    this.pokemonService.choosePokemon(pokemon).subscribe((filterList) => {
      this.pokemonLists = filterList;
    });
  }
}
