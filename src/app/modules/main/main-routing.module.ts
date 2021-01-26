import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'characters',
        loadChildren: () =>
          import('../characters/characters.module').then(
            (m) => m.CharactersModule
          ),
      },
      {
        path: 'comics',
        loadChildren: () =>
          import('../creators/creators.module').then((m) => m.CreatorsModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'series',
        loadChildren: () =>
          import('../series/series.module').then((m) => m.SeriesModule),
      },
      {
        path: 'stories',
        loadChildren: () =>
          import('../stories/stories.module').then((m) => m.StoriesModule),
      },
      {
        path: 'creators',
        loadChildren: () =>
          import('../creators/creators.module').then((m) => m.CreatorsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
