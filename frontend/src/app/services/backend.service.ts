import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {
  StudyLevel,
  SubjectType,
  Subject,
  StudyLevelResponse,
  subjectTypeResponse,
  SubjectResponse,
  CreateReviewRequest,
  ReviewResponse,
  ReviewsResponse,
  UsersResponse,
  OneReviewResponse,
  ReviewHistoryResponse,
} from 'src/app/models';

import { Observable } from 'rxjs';

const API = `${environment.baseUrl}`;

@Injectable()
export class BackendService {
  constructor(private http: HttpClient) {}

  getStudyLevels(): Observable<StudyLevelResponse> {
    return this.http.get<StudyLevelResponse>(`${API}/study_levels`, {
      responseType: 'json',
    });
  }

  getSubjectTypes(): Observable<subjectTypeResponse> {
    return this.http.get<subjectTypeResponse>(`${API}/subject_types`, {
      responseType: 'json',
    });
  }

  getSubjects(): Observable<SubjectResponse> {
    return this.http.get<SubjectResponse>(`${API}/subjects`, {
      responseType: 'json',
    });
  }

  createReview(request: CreateReviewRequest): Observable<ReviewResponse> {
    return this.http.post<ReviewResponse>(`${API}/reviews`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updateReview(
    uid: string,
    request: CreateReviewRequest
  ): Observable<ReviewResponse> {
    return this.http.put<ReviewResponse>(`${API}/reviews/${uid}`, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getAllReviews(): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>(`${API}/reviews`, {
      responseType: 'json',
    });
  }

  getOneReview(uid: string): Observable<OneReviewResponse> {
    return this.http.get<OneReviewResponse>(`${API}/reviews/${uid}`, {
      responseType: 'json',
    });
  }

  getReviewWithHistory(uid: string): Observable<ReviewHistoryResponse> {
    return this.http.get<ReviewHistoryResponse>(
      `${API}/reviews/history/${uid}`,
      {
        responseType: 'json',
      }
    );
  }

  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${API}/user`, {
      responseType: 'json',
    });
  }
}
