import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterLayoutComponent } from './components/character-layout/character-layout.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterLayoutComponent,
    data: { title: 'characters' },
    children: [
      {
        path: '',
        component: CharactersListComponent,

      },
      {
        path: ':id_character',
        component: CharacterDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
