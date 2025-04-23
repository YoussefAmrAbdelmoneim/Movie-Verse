import { DatePipe, DecimalPipe } from '@angular/common';
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
import { MoviesService } from './../../core/services/movies/movies.service';
@Component({
  selector: 'app-home',
  imports: [DatePipe, DecimalPipe, CarouselModule, RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly movieService = inject(MoviesService);
  private readonly tvShowsService = inject(TvShowsService);
  private readonly translate = inject(TranslationService);
  activeTab: 'movies' | 'tv' = 'movies';
  featuredContent: WritableSignal<IMovie> = signal({} as IMovie);
  nowPlayingMovies: WritableSignal<IMovie[]> = signal([]);
  popularMovies: WritableSignal<IMovie[]> = signal([]);
  popularTvShows: WritableSignal<IMovie[]> = signal([]);
  onTheAirTvShows: WritableSignal<IMovie[]> = signal([]);
  topRatedMovies: WritableSignal<IMovie[]> = signal([]);
  upcomingMovies: WritableSignal<IMovie[]> = signal([]);
  topRatedTvShows: WritableSignal<IMovie[]> = signal([]);
  trendingThisWeek: WritableSignal<IMovie[]> = signal([]);
  trendingTvThisWeek: WritableSignal<IMovie[]> = signal([]);

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [' '],
    rtl: true,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      960: { items: 4 },
      1200: { items: 5 },
    },
    nav: false,
  };

  ngOnInit() {
    this.loadFeaturedContent();
    this.loadNowPlayingMovies();
    this.loadPopularMovies('1');
    this.loadPopularTvShows();
    this.loadOnTheAirTvShows();
    this.loadTopRatedMovies();
    this.loadUpcomingMovies();
    this.loadTopRatedTvShows();
    this.loadTrendingThisWeek();
    this.loadTrendingTvThisWeek();

    this.translate.onLangChange.subscribe(() => {
      this.loadFeaturedContent();
      this.loadNowPlayingMovies();
      this.loadPopularMovies('1');
      this.loadPopularTvShows();
      this.loadOnTheAirTvShows();
      this.loadTopRatedMovies();
      this.loadUpcomingMovies();
      this.loadTopRatedTvShows();
      this.loadTrendingThisWeek();
      this.loadTrendingTvThisWeek();
    });
  }

  loadFeaturedContent() {
    this.movieService.getFeaturedMovies().subscribe({
      next: (res) => {
        this.featuredContent.set(res.results[0]);
      },
    });
  }

  loadNowPlayingMovies() {
    this.movieService.nowPlayingMovies('1').subscribe({
      next: (res) => {
        this.nowPlayingMovies.set(res.results);
      },
    });
  }

  loadPopularMovies(page: string) {
    this.movieService.popularMovies(page).subscribe({
      next: (res) => {
        this.popularMovies.set(res.results);
      },
    });
  }

  loadOnTheAirTvShows() {
    this.tvShowsService.airingTvShows('1').subscribe({
      next: (res) => {
        this.popularTvShows.set(res.results);
      },
    });
  }

  loadPopularTvShows() {
    this.tvShowsService.popularTvShows('1').subscribe({
      next: (res) => {
        this.onTheAirTvShows.set(res.results);
      },
    });
  }

  loadTopRatedMovies() {
    this.movieService.topRatedMovies('1').subscribe({
      next: (res) => {
        this.topRatedMovies.set(res.results);
      },
    });
  }

  loadUpcomingMovies() {
    this.movieService.upcomingMovies('1').subscribe({
      next: (res) => {
        this.upcomingMovies.set(res.results);
      },
    });
  }

  loadTopRatedTvShows() {
    this.tvShowsService.topRatedTvShows('1').subscribe({
      next: (res) => {
        this.topRatedTvShows.set(res.results);
      },
    });
  }

  loadTrendingThisWeek() {
    this.movieService.trendingMoviesThisWeek().subscribe({
      next: (res) => {
        this.trendingThisWeek.set(res.results);
      },
    });
  }

  loadTrendingTvThisWeek() {
    this.tvShowsService.trendingTvShowsThisWeek().subscribe({
      next: (res) => {
        this.trendingTvThisWeek.set(res.results);
      },
    });
  }

  changeLanguage(lang: string) {
    this.translate.changeLang(lang);
  }
}
