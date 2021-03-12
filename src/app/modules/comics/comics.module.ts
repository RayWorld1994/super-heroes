import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { ComicsRoutingModule } from './comics-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicLayoutComponent } from './components/comic-layout/comic-layout.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { SortComicComponent } from './components/sort-comic/sort-comic.component';
import { FilterComicComponent } from './components/filter-comic/filter-comic.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const angularMaterial = [
  MatCardModule,
  MatListModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatSelectModule,
];

@NgModule({
  declarations: [
    ComicLayoutComponent,
    ComicDetailComponent,
    ComicListComponent,
    SortComicComponent,
    FilterComicComponent,
  ],
  imports: [
    CommonModule,
    ComicsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ...angularMaterial,
  ],
})
export class ComicsModule {}
