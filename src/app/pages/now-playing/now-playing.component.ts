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
import { MoviesService } from '../../core/services/movies/movies.service';
import { TranslationService } from '../../core/services/translation/translation.service';
import { IMovie } from '../../shared/interfaces/imovie';

@Component({
  selector: 'app-now-playing',
  imports: [
    CarouselModule,
    DecimalPipe,
    DatePipe,
    RouterLink,
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss',
})
export class NowPlayingComponent implements OnInit {
  private readonly translate = inject(TranslationService);
  private readonly movieService = inject(MoviesService);
  nowPlayingMovies: WritableSignal<IMovie[]> = signal([]);
  pageNumber: WritableSignal<number> = signal(1);

  ngOnInit(): void {
    this.loadNowPlayingMovies(1);
    this.translate.onLangChange.subscribe(() => {
      this.loadNowPlayingMovies(1);
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
  loadNowPlayingMovies(page: number) {
    this.movieService.nowPlayingMovies(page.toString()).subscribe({
      next: (res) => {
        this.nowPlayingMovies.set(res.results);
        this.pageNumber.set(res.page);
      },
    });
  }
  nextPage() {
    this.pageNumber.update((res) => res + 1);
    this.loadNowPlayingMovies(this.pageNumber());
  }
  prevPage() {
    this.pageNumber.update((res) => res - 1);
    this.loadNowPlayingMovies(this.pageNumber());
  }
}
