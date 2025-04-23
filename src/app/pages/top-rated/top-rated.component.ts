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
  selector: 'app-top-rated',
  imports: [
    CarouselModule,
    DecimalPipe,
    DatePipe,
    RouterLink,
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.scss',
})
export class TopRatedComponent implements OnInit {
  private readonly translate = inject(TranslationService);
  private readonly movieService = inject(MoviesService);
  topRatedMovies: WritableSignal<IMovie[]> = signal([]);
  pageNumber: WritableSignal<number> = signal(1);
  ngOnInit(): void {
    this.loadTopRatedMovies(1);
    this.translate.onLangChange.subscribe(() => {
      this.loadTopRatedMovies(1);
    });
  }
  carouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    rtl: true,
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
  loadTopRatedMovies(page: number): void {
    this.movieService.topRatedMovies(page.toString()).subscribe({
      next: (res) => {
        this.topRatedMovies.set(res.results);
        this.pageNumber.set(res.page);
      },
    });
  }
  nextPage() {
    this.pageNumber.update((res) => res + 1);
    this.loadTopRatedMovies(this.pageNumber());
  }
  prevPage() {
    this.pageNumber.update((res) => res - 1);
    this.loadTopRatedMovies(this.pageNumber());
  }
}
