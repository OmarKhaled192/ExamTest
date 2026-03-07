import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // dynamic dashboard routes include parameters. prerendering requires
  // a `getPrerenderParams` callback that returns the list of
  // parameter combinations to prerender. if you don't know the values or
  // want to rely on server rendering instead, switch to RenderMode.Server
  {
    path: 'dashboard/diplomas/:diplomaId/exams',
    // we don't have a static list of diploma IDs during build, so render
    // this route on demand on the server rather than prerendering all
    // possible permutations.
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/diplomas/:diplomaId/exams/:examId/questions',
    renderMode: RenderMode.Server
  },

  // fallback for everything else
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
