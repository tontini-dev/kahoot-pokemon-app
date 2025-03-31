import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(limit = 10): Observable<Pokemon[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(`${this.apiUrl}/pokemon?limit=${limit}`)
      .pipe(
        map(res => res.results.sort((a, b) => a.name.localeCompare(b.name))),
        switchMap(pokemons => {
          const detailsRequests = pokemons.map(p =>
            this.http.get<any>(p.url).pipe(
              map(data => ({
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                height: data.height,
                weight: data.weight,
                types: data.types.map((t: any) => t.type.name),
              }))
            )
          );
          return forkJoin(detailsRequests);
        })
      );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`).pipe(
      map(data => ({
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t: any) => t.type.name),
      }))
    );
  }
}