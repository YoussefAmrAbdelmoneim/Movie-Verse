import { NgClass } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PeopleService } from '../../core/services/people/people.service';
import { TranslationService } from '../../core/services/translation/translation.service';
import { IPeople } from '../../shared/interfaces/ipeople';

@Component({
  selector: 'app-popular-people',
  imports: [RouterLink, NgClass, TranslatePipe],
  templateUrl: './popular-people.component.html',
  styleUrl: './popular-people.component.scss',
})
export class PopularPeopleComponent implements OnInit {
  private peopleService = inject(PeopleService);
  private readonly translate = inject(TranslationService);
  pageNumber: WritableSignal<number> = signal(1);
  popularPeople: WritableSignal<IPeople[]> = signal([]);
  ngOnInit(): void {
    this.loadPopularPeople(1);
    this.translate.onLangChange.subscribe(() => {
      this.loadPopularPeople(1);
    });
  }
  loadPopularPeople(page: number) {
    this.peopleService.popularPeople(page.toString()).subscribe({
      next: (res) => {
        this.popularPeople.set(res.results);
        this.pageNumber.set(res.page);
      },
    });
  }
  nextPage() {
    this.pageNumber.update((res) => res + 1);
    this.loadPopularPeople(this.pageNumber());
  }
  prevPage() {
    this.pageNumber.update((res) => res - 1);
    this.loadPopularPeople(this.pageNumber());
  }
}
