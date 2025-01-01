import { Component, inject } from '@angular/core';
import { AntwortenService } from '../../state/antworten.service';

@Component({
  selector: 'wal-auswertung',
  imports: [],
  templateUrl: './auswertung.component.html',
  styleUrl: './auswertung.component.css',
})
export class AuswertungComponent {
  private antwortenService = inject(AntwortenService);

  public constructor() {
    // console.log(this.antwortenService.)
  }
}
