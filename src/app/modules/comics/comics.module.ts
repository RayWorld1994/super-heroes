import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { ComicsRoutingModule } from './comics-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicLayoutComponent } from './components/comic-layout/comic-layout.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const angularMaterial = [MatCardModule, MatListModule, MatButtonModule];

@NgModule({
  declarations: [
    ComicLayoutComponent,
    ComicDetailComponent,
    ComicListComponent,
  ],
  imports: [
    CommonModule,
    ComicsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ...angularMaterial,
  ],
})
export class ComicsModule {}
