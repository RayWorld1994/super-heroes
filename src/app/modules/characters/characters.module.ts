import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterLayoutComponent } from './components/character-layout/character-layout.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { SharedModule } from '../shared/shared.module';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { SearchCharacterComponent } from './components/search-character/search-character.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterCharacterComponent } from './components/filter-character/filter-character.component';

const AngularMaterial = [
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  ScrollingModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
];
@NgModule({
  declarations: [
    CharacterLayoutComponent,
    CharactersListComponent,
    CharacterDetailComponent,
    SearchCharacterComponent,
    FilterCharacterComponent,
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
