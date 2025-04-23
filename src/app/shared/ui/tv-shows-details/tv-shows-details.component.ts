import {
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
import { TvShowsService } from '../../../core/services/tvShows/tv-shows.service';
import { ICredits } from '../../interfaces/icredits';
import { IImages } from '../../interfaces/iimages';
import { ISimilar } from '../../interfaces/isimilar';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

@Component({
  selector: 'app-tv-shows-details',
  imports: [
    DecimalPipe,
    DatePipe,
    DurationPipe,
    CarouselModule,
    SlicePipe,
    UpperCasePipe,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './tv-shows-details.component.html',
  styleUrl: './tv-shows-details.component.scss',
})
export class TvShowsDetailsComponent implements OnInit {
  private tvShowsService = inject(TvShowsService);
  private movieService = inject(MoviesService);
  private route = inject(ActivatedRoute);
  private readonly translate = inject(TranslationService);
  private readonly location = inject(Location);
  constructor(private sanitizer: DomSanitizer) {}
  selectedImage: any = null;
  content: any | null = null;
  credits: ICredits | null = null;
  similar: ISimilar | null = null;
  selectedSeason: number | null = null;
  seasonEpisodes: { [key: number]: any } = {};
  id: WritableSignal<string> = signal('');
  images: WritableSignal<IImages[]> = signal([]);
  isModalOpen: WritableSignal<boolean> = signal(false);
  public videoUrl: WritableSignal<SafeResourceUrl | null> = signal(null);
  showVideoPlayer = false;
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (p) => {
        this.id.set(p.get('id')!);
        this.loadTvDetails(this.id());
        this.loadSimilarTvShows(this.id());
        this.loadTvCredits(this.id());
        this.loadImages(this.id());
      },
    });
    this.loadSimilarTvShows(this.id());
    this.loadTvCredits(this.id());
    this.loadTvDetails(this.id());
    this.loadImages(this.id());
    this.translate.onLangChange.subscribe(() => {
      this.loadSimilarTvShows(this.id());
      this.loadTvCredits(this.id());
      this.loadTvDetails(this.id());
    });
  }

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,

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
    dots: false,
    rtl: true,

    nav: false,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      960: { items: 4 },
      1200: { items: 5 },
    },
  };

  loadTvDetails(id: string) {
    this.tvShowsService.getTvDetails(id).subscribe({
      next: (res) => {
        this.content = res;
        this.loadVideo(id, 'tv');
      },
    });
  }

  loadTvCredits(id: string) {
    this.tvShowsService.getTvCredits(id).subscribe({
      next: (res) => {
        this.credits = res;
      },
    });
  }

  loadSimilarTvShows(id: string) {
    this.tvShowsService.getSimilarTvShows(id).subscribe({
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

  toggleSeason(seasonNumber: number): void {
    if (this.selectedSeason === seasonNumber) {
      this.selectedSeason = null;
    } else {
      this.selectedSeason = seasonNumber;
      if (!this.seasonEpisodes[seasonNumber]) {
        this.loadEpisodes(seasonNumber);
      }
    }
  }

  loadEpisodes(seasonNumber: number): void {
    this.tvShowsService
      .getSeasonEpisodes(this.content.id, seasonNumber)
      .subscribe((data) => {
        this.seasonEpisodes[seasonNumber] = data;
      });
  }
  loadImages(id: string) {
    this.tvShowsService.getTvImages(id).subscribe({
      next: (res) => {
        this.images.set(res.backdrops);
      },
    });
  }
  goBack() {
    this.location.back();
  }
  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
