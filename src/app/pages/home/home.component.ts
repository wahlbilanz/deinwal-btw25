import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../data/data.sevice';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { getDeinwalAlternativen } from '../../functions/alternativen.function';

@Component({
  selector: 'wal-home',
  imports: [RouterModule, AngularLineawesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly dataService = inject(DataService);
  public readonly firstKategorie = this.dataService.getFirstKategorie();
  public readonly alternativen = getDeinwalAlternativen();
}
