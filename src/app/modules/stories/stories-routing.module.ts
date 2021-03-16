import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { StoryLayoutComponent } from './components/story-layout/story-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list.component';

const routes: Routes = [
  {
    path: '',
    component: StoryLayoutComponent,
    children: [
      { path: '', component: StoryListComponent },
      { path: ':id_story', component: StoryDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoriesRoutingModule {}
