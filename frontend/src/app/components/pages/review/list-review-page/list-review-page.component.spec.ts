import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReviewPageComponent } from './list-review-page.component';

describe('ListReviewPageComponent', () => {
  let component: ListReviewPageComponent;
  let fixture: ComponentFixture<ListReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
