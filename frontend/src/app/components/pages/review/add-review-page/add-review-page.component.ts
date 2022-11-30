import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ChangeDetectionStrategy } from '@angular/core';
import { BackendService } from 'src/app/services';
import { logError } from 'src/app/components/shared/functions';

import {
  // Objects
  StudyLevel,
  Subject,
  SubjectType,
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
  selector: 'app-add-review-page',
  templateUrl: './add-review-page.component.html',
  styleUrls: ['./add-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReviewPageComponent implements OnInit {
  userID: number = 0;

  studyLevels: StudyLevel[] = [];
  subjectTypes: SubjectType[] = [];
  subjects: Subject[] = [];
  users: User[] = [];

  subjectControl: FormControl = new FormControl();
  subjectsGroups: SubjectGroup[] = [];

  userControl: FormControl = new FormControl();

  reviewSubject: number = 0;

  reviewTitle: string = '';
  reviewText: string = '';

  isAnonym: boolean = true;
  isPublic: boolean = true;

  constructor(
    private backendService: BackendService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStudyLevels();
    this.getAllSubjectTypes();
    this.getAllSubjects();
    this.getAllUsers();
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

  createReview() {
    const createReviewRequest: CreateReviewRequest = {
      reviewAuthorID: this.isAnonym ? 1 : this.userID,
      reviewSubjectID: this.reviewSubject,
      reviewTitle: this.reviewTitle,
      reviewText: this.reviewText,
      isPublic: this.isPublic,
    };

    console.log('CreateReviewRequest');
    console.log(createReviewRequest);

    this.backendService.createReview(createReviewRequest).subscribe(
      (result) => {
        // Debug
        console.log('createReview');
        console.log(result);

        this.router.navigate(['/review/detail', result.data.uid]);
      },
      (error) => {
        logError(error, this.snackBar, 2500);
      }
    );
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
}
