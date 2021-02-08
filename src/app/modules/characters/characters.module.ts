import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterLayoutComponent } from './components/character-layout/character-layout.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { SharedModule } from '../shared/shared.module';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { SearchCharacterComponent } from './components/search-character/search-character.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const AngularMaterial = [
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  ScrollingModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
];
@NgModule({
  declarations: [
    CharacterLayoutComponent,
    CharactersListComponent,
    CharacterDetailComponent,
    SearchCharacterComponent,
  ],
  imports: [
    CharactersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ...AngularMaterial,
  ],
})
export class CharactersModule {}
