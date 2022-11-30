import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { logError } from 'src/app/components/shared/functions';
import { StudyLevel, Subject, SubjectType, LedgerReview } from 'src/app/models';

interface SubjectGroup {
  id: number;
  name: string;
  subjects: Subject[];
}

@Component({
  selector: 'app-list-review-page',
  templateUrl: './list-review-page.component.html',
  styleUrls: ['./list-review-page.component.scss'],
})
export class ListReviewPageComponent implements OnInit {
  reviews: LedgerReview[] = [];
  allReviews: LedgerReview[] = [];

  studyLevels: StudyLevel[] = [];
  subjectTypes: SubjectType[] = [];
  subjects: Subject[] = [];
  subjectsGroups: SubjectGroup[] = [];

  search: string;

  constructor(
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews() {
    this.backendService.getAllReviews().subscribe(
      (result) => {
        // Debug
        console.log('getAllReviews');
        console.log(result);

        this.reviews = result.data;
        this.reviews.sort((a, b) => b.created - a.created);
        this.allReviews = this.reviews;

        if (this.reviews.length > 0) {
          this.getAllStudyLevels();
          this.getAllSubjectTypes();
          this.getAllSubjects();
        }
      },
      (error) => {
        logError(error, this.snackBar, 2500);
      }
    );
  }

  getAllStudyLevels() {
    this.backendService.getStudyLevels().subscribe(
      (result) => {
        // Debug
        console.log('getStudyLevels');
        console.log(result);

        this.studyLevels = result.data;

        this.studyLevels.forEach((lvl) => {
          this.subjectsGroups.push({
            id: lvl.id,
            name: lvl.full_name,
            subjects: [],
          });
        });
      },
      (error) => {
        logError(error, this.snackBar, 2500);
      }
    );
  }

  getAllSubjectTypes() {
    this.backendService.getSubjectTypes().subscribe(
      (result) => {
        // Debug
        console.log('getAllSubjectTypes');
        console.log(result);

        this.subjectTypes = result.data;
      },
      (error) => {
        logError(error, this.snackBar, 2500);
      }
    );
  }

  getAllSubjects() {
    this.backendService.getSubjects().subscribe(
      (result) => {
        // Debug
        console.log('getAllSubjects');
        console.log(result);

        this.subjects = result.data;

        this.subjects.forEach((subject) => {
          // Assign study level object
          subject.study_level = this.studyLevels.find((lvl) => {
            return lvl.id === subject.study_level_id;
          });
          // Assign subject type object
          subject.subject_type = this.subjectTypes.find((type) => {
            return type.id === subject.subject_type_id;
          });
        });

        // Assigning subject to groups based on study level
        this.subjectsGroups.forEach((group) => {
          group.subjects = this.subjects.filter((subject) => {
            return subject.study_level_id === group.id;
          });
        });
      },
      (error) => {
        logError(error, this.snackBar, 2500);
      }
    );
  }

  getSubjectDesc(id: number) {
    let subject = this.subjects.find((s) => s.id === id);

    return [
      subject?.study_level.full_name,
      subject?.full_name,
      subject?.subject_type.name,
    ];
  }

  reviewDetail(review: LedgerReview) {
    this.router.navigate(['/review/detail', review.UID]);
  }

  searchChange(str: string) {
    if (str.length === 0) {
      this.reviews = this.allReviews;
    } else {
      this.reviews = this.reviews.filter((r) =>
        r.title.toLowerCase().includes(str.toLowerCase())
      );
    }
  }
}
