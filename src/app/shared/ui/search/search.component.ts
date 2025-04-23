import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { MoviesService } from '../../../core/services/movies/movies.service';
import { SearchResult, Tab } from '../../interfaces/isearch';
@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private searchTerms = new Subject<string>();
  searchQuery = '';
  searchResults: SearchResult[] = [];
  isLoading = false;
  activeTab: 'movie' | 'tv' | 'person' = 'movie';
  errorMessage: string | null = null;
  tabs: Tab[] = [
    { id: 'movie', label: 'Movies' },
    { id: 'tv', label: 'TV Shows' },
    { id: 'person', label: 'People' },
  ];
  @Output() close = new EventEmitter<void>();
  ngOnInit() {
    this.setupSearchSubscription();
  }
  setupSearchSubscription() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          this.errorMessage = null;
        }),
        switchMap((term) => {
          if (!term.trim()) {
            this.searchResults = [];
            return of([]);
          }
          return this.moviesService.searchMovies(this.activeTab, term).pipe(
            catchError((error) => {
              console.error('Search error:', error);
              this.errorMessage = 'Failed to load results. Please try again.';
              return of({ results: [] });
            })
          );
        })
      )
      .subscribe({
        next: (res) => {
          this.searchResults = res.results || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Search subscription error:', err);
          this.errorMessage = 'An error occurred during search.';
          this.isLoading = false;
        },
      });
  }

  search() {
    this.searchTerms.next(this.searchQuery);
  }

  setActiveTab(tab: any) {
    this.activeTab = tab;
    if (this.searchQuery) {
      this.search();
      this.setupSearchSubscription();
    }
  }

  closeModal() {
    this.close.emit();
  }
}
