import { DatePipe, DecimalPipe, Location } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PeopleService } from '../../../core/services/people/people.service';
import { TranslationService } from '../../../core/services/translation/translation.service';
import { IPDetails } from '../../interfaces/ipdetails';
@Component({
  selector: 'app-actor-details',
  imports: [DatePipe, DecimalPipe, CarouselModule, TranslatePipe, RouterLink],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.scss',
})
export class ActorDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private peopleService = inject(PeopleService);
  private readonly translate = inject(TranslationService);
  private readonly location = inject(Location);
  actor: any = {};
  credits = signal<any>({ cast: [] });
  knownFor = signal<IPDetails[]>([]);
  loadAllCredits = false;

  actorId: WritableSignal<string> = signal('');
  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (p) => {
        this.actorId.set(p.get('id')!);
        this.loadActorDetails(this.actorId());
        this.loadActorCredits(this.actorId());
      },
    });
    if (this.actorId()) {
      this.loadActorDetails(this.actorId());
      this.loadActorCredits(this.actorId());
      this.translate.onLangChange.subscribe(() => {
        this.loadActorDetails(this.actorId());
        this.loadActorCredits(this.actorId());
      });
    }
  }
  goBack() {
    this.location.back();
  }
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    nav: false,
    navText: [''],
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      960: { items: 4 },
      1200: { items: 5 },
    },
  };

  loadActorDetails(actorId: string) {
    this.peopleService.popularPeopleDetails(actorId).subscribe({
      next: (res) => {
        this.actor = res;
      },
    });
  }
  loadActorCredits(actorId: string) {
    this.peopleService.getActorCredits(actorId).subscribe({
      next: (res) => {
        const uniqueCredits = this.removeDuplicateCredits(res.cast);
        this.credits.set({
          ...res,
          cast: uniqueCredits,
        });
        this.knownFor.set(
          [...uniqueCredits]
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 10)
        );
      },
    });
  }

  private removeDuplicateCredits(credits: any[]): any[] {
    const creditsMap = new Map<number, any>();
    credits.forEach((credit) => {
      if (!creditsMap.has(credit.id)) {
        creditsMap.set(credit.id, credit);
      }
    });
    return Array.from(creditsMap.values());
  }
}
