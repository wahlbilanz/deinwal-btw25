import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { DataService } from './data/data.sevice';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'quiz/:kategorie',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(): Promise<Record<string, string>[]> {
      const dataService = inject(DataService);
      return dataService.getAlleKategorien().map(kategorie => ({ kategorie }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
