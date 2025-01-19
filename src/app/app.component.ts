import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from './data/data.sevice';

import { LaIconLibrary } from 'angular-line-awesome';
import {
  lasAngleDown,
  lasAngleLeft,
  lasAngleRight,
  lasChartBar,
  lasCircle,
  lasTag,
  lasThumbsDown,
  lasThumbsUp,
  lasTrashAlt,
  lasYinYang,
} from 'angular-line-awesome/icons';

@Component({
  selector: 'wal-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly dataService = inject(DataService);
  public readonly firstKategorie = this.dataService.getFirstKategorie();

  public constructor(library: LaIconLibrary) {
    library.addIcons([
      lasYinYang,
      lasThumbsUp,
      lasThumbsDown,
      lasTag,
      lasAngleLeft,
      lasAngleRight,
      lasChartBar,
      lasAngleDown,
      lasTrashAlt,
      lasCircle,
    ]);
  }
}
