import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterLayoutComponent } from './components/character-layout/character-layout.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterItemComponent } from './components/character-item/character-item.component';
import { SharedModule } from '../shared/shared.module';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ListInfoComponent } from './components/list-info/list-info.component';

const AngularMaterial = [
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  ScrollingModule,
];
@NgModule({
  declarations: [
    CharacterLayoutComponent,
    CharactersListComponent,
    CharacterItemComponent,
    CharacterDetailComponent,
    ExpansionPanelComponent,
    ListInfoComponent,
  ],
  imports: [
    CharactersRoutingModule,
    SharedModule,
    ...AngularMaterial,
  ],
})
export class CharactersModule {}
