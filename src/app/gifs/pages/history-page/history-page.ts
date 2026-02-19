import { Component, computed, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-history-page',
  imports: [GifList],
  templateUrl: './history-page.html',
})
export default class HistoryPage {

  gifsService = inject(GifsService)

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( (params) => params['query'] )
    )
  );


  gifsByKey = computed( () => this.gifsService.getHistoryGifs(this.query()));


}
