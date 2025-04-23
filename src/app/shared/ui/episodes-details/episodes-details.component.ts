import { DatePipe, DecimalPipe, Location } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslationService } from '../../../core/services/translation/translation.service';
import { TvShowsService } from '../../../core/services/tvShows/tv-shows.service';

@Component({
  selector: 'app-episodes-details',
  imports: [DatePipe, DecimalPipe, RouterLink, CarouselModule, TranslatePipe],
  templateUrl: './episodes-details.component.html',
  styleUrl: './episodes-details.component.scss',
})
export class EpisodesDetailsComponent implements OnInit {
  private tvShowsService = inject(TvShowsService);
  private route = inject(ActivatedRoute);
  private readonly translate = inject(TranslationService);
  private readonly location = inject(Location);
  episode: WritableSignal<any | null> = signal(null);
  showDetails: WritableSignal<any | null> = signal(null);
  videoUrl: SafeResourceUrl | null = null;
  id: WritableSignal<string> = signal('');
  seasonNumber: WritableSignal<string> = signal('');
  episodeNumber: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (p) => {
        this.id.set(p.get('id')!);
        this.seasonNumber.set(p.get('seasonNumber')!);
        this.episodeNumber.set(p.get('episodeNumber')!);
      },
    });
    this.loadData(this.id(), this.seasonNumber(), this.episodeNumber());
    this.translate.onLangChange.subscribe(() => {
      this.loadData(this.id(), this.seasonNumber(), this.episodeNumber());
    });
  }
  loadData(showId: string, seasonNumber: string, episodeNumber: string) {
    this.tvShowsService
      .getSeasonEpisodesDetails(showId, seasonNumber, episodeNumber)
      .subscribe({
        next: (ep) => {
          this.episode.set(ep);
          this.loadShowDetails(showId);
        },
      });
  }
  loadShowDetails(showId: string) {
    this.tvShowsService.getTvDetails(showId).subscribe({
      next: (res) => this.showDetails.set(res),
    });
  }
  goBack() {
    this.location.back();
  }
}
