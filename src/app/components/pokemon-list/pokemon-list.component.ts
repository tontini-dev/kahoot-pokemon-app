import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../services/pokemon.model';
import { Router } from '@angular/router';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  loading = true;
  loadingMore = false;
  limit = 10;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.pokemonService.getPokemons(this.limit).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading Pokémons:', err);
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    this.loadingMore = true;
    this.limit += 10;
    this.pokemonService.getPokemons(this.limit).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loadingMore = false;
      },
      error: (err) => {
        console.error('Error loading more Pokémons:', err);
        this.loadingMore = false;
      }
    });
  }

  goToDetails(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}