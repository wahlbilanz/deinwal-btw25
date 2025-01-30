import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { DataService } from './data/data.sevice';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'quiz/:kategorie',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(): Promise<Record<string, string>[]> {
      const dataService = inject(DataService);
      const possibleUrls: { kategorie: string }[] = dataService
        .getAlleKategorien()
        .map(kategorie => ({ kategorie }));

      dataService
        .getAlleKategorien()
        .filter(kategorie => kategorie.includes(' '))
        .forEach(kategorie => possibleUrls.push({ kategorie: kategorie.replace(' ', '%20') }));

      return possibleUrls;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
