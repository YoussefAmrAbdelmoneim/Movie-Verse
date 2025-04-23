import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'TvDetails/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'TvDetails/:id/season/:seasonNumber/episode/:episodeNumber',
    renderMode: RenderMode.Client
  },
  {
    path: 'actorDetails/:id',
    renderMode: RenderMode.Client
  },
];
