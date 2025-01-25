import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../data/data.sevice';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { deinwalAlternativen } from '../../consts/alternativen.const';

@Component({
  selector: 'wal-home',
  imports: [RouterModule, AngularLineawesomeModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly dataService = inject(DataService);
  public readonly firstKategorie = this.dataService.getFirstKategorie();
  public readonly alternativen = deinwalAlternativen;
}
