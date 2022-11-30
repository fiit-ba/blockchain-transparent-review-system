import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {
  AppComponent,
  LandingPageComponent,
  AddReviewPageComponent,
} from './components';

import { BackendService } from './services';
import { DetailReviewPageComponent } from './components/pages/review/detail-review-page/detail-review-page.component';
import { ListReviewPageComponent } from './components/pages/review/list-review-page/list-review-page.component';
import { ReviewHistoryDialogComponent } from './components/shared/dialogs/review-history-dialog/review-history-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AddReviewPageComponent,
    DetailReviewPageComponent,
    ListReviewPageComponent,
    ReviewHistoryDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FlexLayoutModule,
    MarkdownModule.forRoot(),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
