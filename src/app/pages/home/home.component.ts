import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import data from '../../data/ergebnisse.json';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() {
    console.log(data);
  }

}
