import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReviewPageComponent } from './detail-review-page.component';

describe('DetailReviewPageComponent', () => {
  let component: DetailReviewPageComponent;
  let fixture: ComponentFixture<DetailReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
