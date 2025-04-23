import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MoviesService } from '../../core/services/movies/movies.service';
import { IMovie } from '../../shared/interfaces/imovie';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../core/services/translation/translation.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-popular-movies',
  imports: [
    CarouselModule,
    DecimalPipe,
    DatePipe,
    RouterLink,
    NgClass,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './popular-movies.component.html',
  styleUrl: './popular-movies.component.scss',
})
export class PopularMoviesComponent implements OnInit {
  private readonly translate = inject(TranslationService);
  private readonly movieService = inject(MoviesService);
  popularMovies: WritableSignal<IMovie[]> = signal([]);
  pageNumber: WritableSignal<number> = signal(1);
  ngOnInit(): void {
    this.loadPopularMovies(1);
    this.translate.onLangChange.subscribe(() => {
      this.loadPopularMovies(1);
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
  loadPopularMovies(page: number): void {
    this.movieService.popularMovies(page.toString()).subscribe({
      next: (res) => {
        this.popularMovies.set(res.results);
        this.pageNumber.set(res.page);
      },
    });
  }
  nextPage() {
    this.pageNumber.update((res) => res + 1);
    this.loadPopularMovies(this.pageNumber());
  }
  prevPage() {
    this.pageNumber.update((res) => res - 1);
    this.loadPopularMovies(this.pageNumber());
  }
}
