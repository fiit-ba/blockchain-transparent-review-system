import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import {
  LandingPageComponent,
  AddReviewPageComponent,
  ListReviewPageComponent,
  DetailReviewPageComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'review/add',
    component: AddReviewPageComponent,
  },
  {
    path: 'review/list',
    component: ListReviewPageComponent,
  },
  {
    path: 'review/detail/:uid',
    component: DetailReviewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
