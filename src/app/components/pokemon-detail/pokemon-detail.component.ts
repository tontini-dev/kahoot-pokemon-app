import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../services/pokemon.model';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonByName(name).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error to search Pokémon:', err);
          this.loading = false;
        }
      });
    }
  }
}