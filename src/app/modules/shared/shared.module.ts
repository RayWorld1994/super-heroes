import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgFallbackModule } from 'ngx-img-fallback';

import { CardItemComicComponent } from './components/card-item-comic/card-item-comic.component';
import { ThumbnailSizeDirective } from './directives/thumbnail-size.directive';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ExpansionPanelListComponent } from './components/expansion-panel-list/expansion-panel-list.component';
import { ListInfoComponent } from './components/list-info/list-info.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { CardItemStoryComponent } from './components/card-item-story/card-item-story.component';

const declarations = [
  ThumbnailSizeDirective,
  CardItemComponent,
  ExpansionPanelListComponent,
  ListInfoComponent,
  ScrollToTopComponent,
  CardItemComicComponent,
  CardItemStoryComponent,
];

const AngularMaterial = [
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
];
@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    ImgFallbackModule,
    RouterModule,
    ReactiveFormsModule,
    ...AngularMaterial,
  ],
  exports: [ImgFallbackModule, CommonModule, ...declarations],
})
export class SharedModule {}
