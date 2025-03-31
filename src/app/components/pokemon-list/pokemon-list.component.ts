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

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(10).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar Pokémons:', err);
        this.loading = false;
      }
    });
  }

  goToDetails(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}