import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoryListComponent } from './components/story-list/story-list.component';
import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { StoryLayoutComponent } from './components/story-layout/story-layout.component';
import { SortStoryComponent } from './components/sort-story/sort-story.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterStoryComponent } from './components/filter-story/filter-story.component';
import { ReactiveFormsModule } from '@angular/forms';

const angularMaterial = [
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule
];
@NgModule({
  declarations: [
    StoryListComponent,
    StoryDetailComponent,
    StoryLayoutComponent,
    SortStoryComponent,
    FilterStoryComponent,
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ...angularMaterial,
  ],
})
export class StoriesModule {}
