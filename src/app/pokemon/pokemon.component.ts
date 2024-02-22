import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selected: boolean = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {

    const pokemonNames = ["Bulbasaur", "Squirtle", "Charmander"];


    pokemonNames.forEach(name => {
      this.pokemonService.getPokemon(name).subscribe(
        data => {
          this.pokemons.push(data);
        }
      );
    });
  }

  selectCard(pokemon: any): void {
    if(this.selected === false){
      const confirmation = confirm('Do you want to select this card?');
      if (confirmation) {
        this.pokemons = [pokemon];
        this.selected = true;
      }
    }
  }
}