import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { ScrollStateService } from 'src/app/shared/services/scroll-states';
import { GifsService } from '../../services/gifs.service';


@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {

  gifsService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  // Referencia al div que contiene el scroll
  scrollDivRef = viewChild<ElementRef<HTMLElement>>('groupDiv');

  ngAfterViewInit(): void {

    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendinScrollState();

  }

  onScroll(event: Event) {

    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const scrollHeight = scrollDiv.scrollHeight;
    const clientHeight = scrollDiv.clientHeight;

    // Si el usuario ha llegado al final del scroll, cargar más gifs
    const isAtBottom = scrollTop + clientHeight + 200 >= scrollHeight;

    this.scrollStateService.trendinScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifsService.loadTrendingGifs();
    }

  }



}
