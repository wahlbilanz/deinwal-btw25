import { Component, HostListener, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from './data/data.sevice';

import { AngularLineawesomeModule, LaIconLibrary } from 'angular-line-awesome';
import {
  lasAngleDown,
  lasAngleLeft,
  lasAngleRight,
  lasArchive,
  lasBars,
  lasChartBar,
  lasCircle,
  lasHamburger,
  lasPuzzlePiece,
  lasTag,
  lasThumbsDown,
  lasThumbsUp,
  lasTimes,
  lasTimesCircle,
  lasTrashAlt,
  lasYinYang,
} from 'angular-line-awesome/icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'wal-root',
  imports: [RouterOutlet, RouterModule, AngularLineawesomeModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly dataService = inject(DataService);
  public readonly firstKategorie = this.dataService.getFirstKategorie();
  public hideMobileMenu = true;

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
      lasArchive,
      lasPuzzlePiece,
      lasHamburger,
      lasBars,
      lasTimesCircle,
    ]);
  }

  public toggleMenu(): void {
    this.hideMobileMenu = !this.hideMobileMenu;
  }

  @HostListener('document:mouseup', ['$event'])
  public onGlobalClick(): void {
    if (!this.hideMobileMenu) {
      setTimeout(() => {
        this.hideMobileMenu = true;
      }, 100);
    }
  }
}
