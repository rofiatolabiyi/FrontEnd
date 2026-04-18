import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'quiz',
    loadComponent: () => import('./quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'memory',
    loadComponent: () => import('./memory/memory.page').then( m => m.MemoryPage)
  },
  {
    path: 'guess',
    loadComponent: () => import('./guess/guess.page').then( m => m.GuessPage)
  },
  {
    path: 'scores',
    loadComponent: () => import('./scores/scores.page').then( m => m.ScoresPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
];
