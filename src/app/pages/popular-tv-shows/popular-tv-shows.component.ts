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
  selector: 'app-popular-tv-shows',
  imports: [
    CarouselModule,
    DecimalPipe,
    DatePipe,
    RouterLink,
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './popular-tv-shows.component.html',
  styleUrl: './popular-tv-shows.component.scss',
})
export class PopularTvShowsComponent implements OnInit {
  private readonly translate = inject(TranslationService);
  private readonly tvShowsService = inject(TvShowsService);
  popularTvSows: WritableSignal<IMovie[]> = signal([]);
  pageNumber: WritableSignal<number> = signal(1);
  ngOnInit(): void {
    this.loadPopularTvSows(1);
    this.translate.onLangChange.subscribe(() => {
      this.loadPopularTvSows(1);
    });
  }
  carouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    rtl: true,

    autoHeight: true,
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
  loadPopularTvSows(page: number): void {
    this.tvShowsService.popularTvShows(page.toString()).subscribe({
      next: (res) => {
        this.popularTvSows.set(res.results);
        this.pageNumber.set(res.page);
      },
    });
  }
  nextPage() {
    this.pageNumber.update((res) => res + 1);
    this.loadPopularTvSows(this.pageNumber());
  }
  prevPage() {
    this.pageNumber.update((res) => res - 1);
    this.loadPopularTvSows(this.pageNumber());
  }
}
