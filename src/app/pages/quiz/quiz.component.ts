import { Component } from '@angular/core';
import { DataService } from '../../data/data.sevice';

@Component({
  selector: 'wal-quiz',
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
public constructor(private readonly dataService: DataService) {
    // console.log(this.dataService.getFragen());
    // console.log(this.dataService.getErgebnisse());
}
}
