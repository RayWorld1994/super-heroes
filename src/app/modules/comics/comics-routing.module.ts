import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { ComicLayoutComponent } from './components/comic-layout/comic-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ComicLayoutComponent,
    children: [
      {
        path: '',
        component: ComicListComponent,
      },
      {
        path: ':id_comic',
        component: ComicDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicsRoutingModule {}
