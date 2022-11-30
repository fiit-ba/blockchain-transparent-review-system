import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHistoryDialogComponent } from './review-history-dialog.component';

describe('ReviewHistoryDialogComponent', () => {
  let component: ReviewHistoryDialogComponent;
  let fixture: ComponentFixture<ReviewHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
