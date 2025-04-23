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
  selector: 'app-top-rated-tv',
  imports: [
    CarouselModule,
    DecimalPipe,
    DatePipe,
    RouterLink,
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './top-rated-tv.component.html',
  styleUrl: './top-rated-tv.component.scss',
})
export class TopRatedTvComponent implements OnInit {
  private readonly translate = inject(TranslationService);
  private readonly tvShowsService = inject(TvShowsService);
  topRatedTv: WritableSignal<IMovie[]> = signal([]);
  pageNumber: WritableSignal<number> = signal(1);
  ngOnInit(): void {
    this.loadTopRatedTv(1);
    this.translate.onLangChange.subscribe(() => {
      this.loadTopRatedTv(1);
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
  loadTopRatedTv(page: number): void {
    this.tvShowsService.topRatedTvShows(page.toString()).subscribe({
      next: (res) => {
        this.topRatedTv.set(res.results);
        this.pageNumber.set(res.page);
      },
    });
  }
  nextPage() {
    this.pageNumber.update((res) => res + 1);
    this.loadTopRatedTv(this.pageNumber());
  }
  prevPage() {
    this.pageNumber.update((res) => res - 1);
    this.loadTopRatedTv(this.pageNumber());
  }
}
