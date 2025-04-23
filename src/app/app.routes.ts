import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
  
  // Movie-related routes
  { 
    path: 'details/:id', 
    loadComponent: () => import('./shared/ui/details/details.component').then(m => m.DetailsComponent), 
    title: 'Movie Details' 
  },
  { 
    path: 'popularMovies', 
    loadComponent: () => import('./pages/popular-movies/popular-movies.component').then(m => m.PopularMoviesComponent), 
    title: 'Popular Movies' 
  },
  { 
    path: 'nowPlaying', 
    loadComponent: () => import('./pages/now-playing/now-playing.component').then(m => m.NowPlayingComponent), 
    title: 'Now Playing' 
  },
  { 
    path: 'comingSoon', 
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then(m => m.ComingSoonComponent), 
    title: 'Coming Soon' 
  },
  { 
    path: 'topRated', 
    loadComponent: () => import('./pages/top-rated/top-rated.component').then(m => m.TopRatedComponent), 
    title: 'Top Rated' 
  },
  { 
    path: 'TvDetails/:id', 
    loadComponent: () => import('./shared/ui/tv-shows-details/tv-shows-details.component').then(m => m.TvShowsDetailsComponent), 
    title: 'TV Details' 
  },
  { 
    path: 'TvDetails/:id/season/:seasonNumber/episode/:episodeNumber', 
    loadComponent: () => import('./shared/ui/episodes-details/episodes-details.component').then(m => m.EpisodesDetailsComponent), 
    title: 'Episode Details' 
  }, 
  { 
    path: 'popularTvShows', 
    loadComponent: () => import('./pages/popular-tv-shows/popular-tv-shows.component').then(m => m.PopularTvShowsComponent), 
    title: 'Popular TvShows' 
  },
  { 
    path: 'airingToday', 
    loadComponent: () => import('./pages/airing-today/airing-today.component').then(m => m.AiringTodayComponent), 
    title: 'Airing Today' 
  }, 
  { 
    path: 'topRatedTv', 
    loadComponent: () => import('./pages/top-rated-tv/top-rated-tv.component').then(m => m.TopRatedTvComponent), 
    title: 'Top Rated TvShows' 
  },
  { 
    path: 'popularPeople', 
    loadComponent: () => import('./pages/popular-people/popular-people.component').then(m => m.PopularPeopleComponent), 
    title: 'Popular People' 
  },
  { 
    path: 'actorDetails/:id', 
    loadComponent: () => import('./shared/ui/actor-details/actor-details.component').then(m => m.ActorDetailsComponent), 
    title: 'Actor' 
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' }
];