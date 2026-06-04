import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Magic8ballComponent } from './pages/magic8ball/magic8ball.component';
import { AlibiGeneratorComponent } from './pages/alibi-generator/alibi-generator.component';
import { MemeBattleComponent } from './pages/meme-battle/meme-battle.component';
import { JokeMachineComponent } from './pages/joke-machine/joke-machine.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'magic8ball', component: Magic8ballComponent },
  { path: 'alibi-generator', component: AlibiGeneratorComponent },
  { path: 'meme-battle', component: MemeBattleComponent },
  { path: 'joke-machine', component: JokeMachineComponent },
  {
    path: 'what-to-do',
    loadComponent: () =>
      import('./pages/what-to-do/what-to-do.component').then(
        (m) => m.WhatToDoComponent
      ),
  },
];
