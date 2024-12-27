import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuswertungComponent } from './pages/auswertung/auswertung.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { FaqComponent } from './pages/faq/faq.component';

export const routes: Routes = [{
    path: 'home',
    component: HomeComponent,
},{
    path: 'quiz',
    component: QuizComponent,
},{
    path: 'faq',
    component: FaqComponent,
},{
    path: 'imprint',
    component: ImprintComponent,
},{
    path: 'auswertung',
    component: AuswertungComponent,
}, {
    path: '',
    pathMatch: "full",
  redirectTo: '/home',

},
];
