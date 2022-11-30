import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, ReviewHistory } from 'src/app/models';

@Component({
  selector: 'app-review-history-dialog',
  templateUrl: './review-history-dialog.component.html',
  styleUrls: ['./review-history-dialog.component.scss'],
})
export class ReviewHistoryDialogComponent implements OnInit {
  reviewHist: ReviewHistory[] = [];
  subjects: Subject[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReviewHistoryDialogComponent>
  ) {}

  ngOnInit(): void {
    this.subjects = this.data.subjects;
    this.reviewHist = this.data.history;
  }

  getSubjectDesc(id: number) {
    let subject = this.subjects.find((s) => s.id === id);

    return [
      subject?.study_level.full_name,
      subject?.full_name,
      subject?.subject_type.name,
    ];
  }
}
