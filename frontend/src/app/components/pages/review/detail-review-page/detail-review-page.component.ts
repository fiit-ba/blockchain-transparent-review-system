import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { BackendService } from 'src/app/services';
import { ReviewHistoryDialogComponent } from 'src/app/components/shared/dialogs/review-history-dialog/review-history-dialog.component';
import { logError } from 'src/app/components/shared/functions';


import {
  // Objects
  StudyLevel,
  Subject,
  SubjectType,
  Review,
  User,
  // Requests
  CreateReviewRequest,
} from 'src/app/models';

interface SubjectGroup {
  id: number;
  name: string;
  subjects: Subject[];
}

@Component({
  selector: 'app-detail-review-page',
  templateUrl: './detail-review-page.component.html',
  styleUrls: ['./detail-review-page.component.scss'],
})
export class DetailReviewPageComponent implements OnInit {
  studyLevels: StudyLevel[] = [];
  subjectTypes: SubjectType[] = [];
  subjects: Subject[] = [];
  users: User[] = [];

  review: Review;
  update: boolean = false;

  subjectControl: FormControl = new FormControl();
  subjectsGroups: SubjectGroup[] = [];

  userControl: FormControl = new FormControl();

  reviewSubject: number = 0;

  isAnonym: boolean = true;
  isPublic: boolean = true;

  subjectID: number;
  authorID: number;
  reviewTitle: string;
  reviewText: string;

  showHistoryDisabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
    private cryptoDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReview(this.route.snapshot.paramMap.get('uid'));
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

  getReview(uid: any) {
    this.backendService.getOneReview(uid).subscribe(
      (result) => {
        // Debug
        console.log('getOneReview');
        console.log(result);

        this.review = result.data;

        this.subjectID = this.review.subjectID;
        this.authorID = this.review.authorID;
        this.reviewTitle = this.review.title;
        this.reviewText = this.review.text;

        this.isAnonym = this.review.authorID === 1 ? true : false;

        this.getAllStudyLevels();
        this.getAllSubjectTypes();
        this.getAllSubjects();
        this.getAllUsers();
      },
      (error) => {
        logError(error, this.snackBar, 2500);
      }
    );
  }

  getAllUsers() {
    this.backendService.getAllUsers().subscribe(
      (result) => {
        // Debug
        console.log('getAllUsers');
        console.log(result);

        this.users = result.data;

        const indexOfObject = this.users.findIndex((user) => {
          return user.id === 1;
        });
        this.users.splice(indexOfObject, 1);
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

  handleKeydown(event: any) {
    // on TAB
    if (event.keyCode === 9) {
      event.preventDefault();
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;
      event.target.value =
        event.target.value.substring(0, start) +
        '\t' +
        event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
  }

  updateReview() {
    const createReviewRequest: CreateReviewRequest = {
      reviewAuthorID: this.isAnonym ? 1 : this.authorID,
      reviewSubjectID: this.subjectID,
      reviewTitle: this.reviewTitle,
      reviewText: this.reviewText,
      isPublic: this.isPublic,
    };

    console.log('UpdateReviewRequest');
    console.log(createReviewRequest);

    this.backendService
      .updateReview(this.review.uid, createReviewRequest)
      .subscribe(
        (result) => {
          // Debug
          console.log('updateReview');
          console.log(result);

          window.location.reload();
        },
        (error) => {
          logError(error, this.snackBar, 2500);
        }
      );
  }

  openHistoryDialog() {
    this.showHistoryDisabled = true;
    this.backendService.getReviewWithHistory(this.review.uid).subscribe(
      (result) => {
        // Debug
        console.log('getReviewWithHistory');
        console.log(result);

        const dialogRef = this.cryptoDialog.open(ReviewHistoryDialogComponent, {
          data: {
            uid: this.review.uid,
            subjects: this.subjects,
            history: result.data,
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.showHistoryDisabled = false;
        });
      },
      (error) => {
        logError(error, this.snackBar, 2500);
      }
    );
  }
}
