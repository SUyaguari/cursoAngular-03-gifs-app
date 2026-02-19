import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from 'src/app/mapper/gif.mapper';
import { map, tap } from 'rxjs';

const HISTORY_KEY = 'history';

const loadFromLocalStorage = (): Record<string, Gif[]> => {

  const history = localStorage.getItem(HISTORY_KEY);

  return history ? JSON.parse(history) : {};

}

@Injectable({ providedIn: 'root' })
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed( () => Object.keys(this.searchHistory()) );

  constructor() {
    this.loadTrendingGifs();
  }

  saveToLocalStorage = effect( () => {

    localStorage.setItem( HISTORY_KEY, JSON.stringify(this.searchHistory()) )

  });

  loadTrendingGifs() {

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 21
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemstoGifsArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });

  }

  searchGifs(query: string) {

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 21
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemstoGifsArray(items)),
      tap( (items) => {
        this.searchHistory.update( (history) => ({
          ...history,
          [query.toLocaleLowerCase()]: items
        }) )
      } )
    );
  }

  getHistoryGifs( query: string ): Gif[] {

    return this.searchHistory()[query] ?? [];

  }

}
