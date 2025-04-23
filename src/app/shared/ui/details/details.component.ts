import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  Location,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MoviesService } from '../../../core/services/movies/movies.service';
import { TranslationService } from '../../../core/services/translation/translation.service';
import { ICredits } from '../../interfaces/icredits';
import { IImages } from '../../interfaces/iimages';
import { IMovie } from '../../interfaces/imovie';
import { ISimilar } from '../../interfaces/isimilar';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

@Component({
  selector: 'app-details',
  imports: [
    DatePipe,
    DecimalPipe,
    CarouselModule,
    SlicePipe,
    CurrencyPipe,
    UpperCasePipe,
    DurationPipe,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly translate = inject(TranslationService);
  private movieService = inject(MoviesService);
  private readonly location = inject(Location);
  constructor(private sanitizer: DomSanitizer) {}
  content: IMovie | null = null;
  credits: ICredits | null = null;
  similar: ISimilar | null = null;
  id: WritableSignal<string> = signal('');
  images: WritableSignal<IImages[]> = signal([]);
  isModalOpen: WritableSignal<boolean> = signal(false);
  selectedImage: any = null;
  public videoUrl: WritableSignal<SafeResourceUrl | null> = signal(null);
  showVideoPlayer = false;
  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (p) => {
        this.id.set(p.get('id')!);
        this.loadMovieDetails(this.id());
        this.loadMovieCredits(this.id());
    this.loadSimilarMovies(this.id());
    this.loadImages(this.id());
      },
    });
    this.loadMovieDetails(this.id());
    this.loadMovieCredits(this.id());
    this.loadSimilarMovies(this.id());
    this.loadImages(this.id());
    this.translate.onLangChange.subscribe(() => {
      this.loadMovieDetails(this.id());
      this.loadMovieCredits(this.id());
      this.loadSimilarMovies(this.id());
    });
  }
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      960: { items: 4 },
      1200: { items: 5 },
    },
  };
  carouselImages: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,

    dots: false,
    nav: false,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      960: { items: 4 },
      1200: { items: 5 },
    },
  };

  loadMovieDetails(id: string) {
    this.movieService.getMovieDetails(id).subscribe({
      next: (res) => {
        this.content = res;
        this.loadVideo(id, 'movie');
      },
    });
  }

  loadMovieCredits(id: string) {
    this.movieService.getMovieCredits(id).subscribe({
      next: (res) => {
        this.credits = res;
      },
    });
  }

  loadSimilarMovies(id: string) {
    this.movieService.getSimilarMovies(id).subscribe({
      next: (res) => {
        this.similar = res;
      },
    });
  }

  loadVideo(id: string, type: string) {
    this.movieService.getMovieVideos(id, type).subscribe({
      next: (res) => {
        if (res.results && res.results.length > 0) {
          const videoKey = res.results[0].key;
          const url = `https://www.youtube.com/embed/${videoKey}`;
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.videoUrl.set(safeUrl);
        }
      },
    });
  }
  loadImages(id: string) {
    this.movieService.getMovieImages(id).subscribe({
      next: (res) => {
        this.images.set(res.backdrops);
      },
    });
  }
  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
  goBack() {
    this.location.back();
  }
}
