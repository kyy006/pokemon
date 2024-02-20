import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PokemonListComponent, PokemonCardComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [PokemonListComponent],
})
export class HomeModule {}
