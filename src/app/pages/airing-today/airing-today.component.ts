import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslationService } from '../../core/services/translation/translation.service';
import { TvShowsService } from '../../core/services/tvShows/tv-shows.service';
import { IMovie } from '../../shared/interfaces/imovie';

@Component({
  selector: 'app-airing-today',
  imports: [
    CarouselModule,
    DecimalPipe,
    DatePipe,
    RouterLink,
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './airing-today.component.html',
  styleUrl: './airing-today.component.scss',
})
export class AiringTodayComponent implements OnInit {
  private readonly translate = inject(TranslationService);
  private readonly tvShowsService = inject(TvShowsService);
  airingToday: WritableSignal<IMovie[]> = signal([]);
  pageNumber: WritableSignal<number> = signal(1);
  ngOnInit(): void {
    this.loadAiringToday(1);
    this.translate.onLangChange.subscribe(() => {
      this.loadAiringToday(1);
    });
  }
  carouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    rtl: true,

    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    nav: false,
  };
  loadAiringToday(page: number): void {
    this.tvShowsService.airingTvShows(page.toString()).subscribe({
      next: (res) => {
        this.airingToday.set(res.results);
        this.pageNumber.set(res.page);
      },
    });
  }
  nextPage() {
    this.pageNumber.update((res) => res + 1);
    this.loadAiringToday(this.pageNumber());
  }
  prevPage() {
    this.pageNumber.update((res) => res - 1);
    this.loadAiringToday(this.pageNumber());
  }
}
