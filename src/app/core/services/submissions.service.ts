import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiEndPoints } from '../enums/api-endpoints';
import { Submission, SubmissionReq, SubmissionRes, SubmissionDetailsRes, PaginatedSubmissionsRes } from '../models/submission.model';
import { PaginatedPayload } from '../models/pagination.model';
import { PaginatedAdaptor } from '../adapters/api.adaptor';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _paginatedAdaptor = inject(PaginatedAdaptor<Submission>);

  submitExam(data: SubmissionReq): Observable<SubmissionRes> {
    return this._httpClient.post<SubmissionRes>(ApiEndPoints.SUBMISSIONS, data);
  }

  getUserSubmissions(page: number = 1, limit: number = 12, examId?: string, search?: string): Observable<PaginatedPayload<Submission>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (examId) params = params.set('examId', examId);
    if (search) params = params.set('search', search);

    return this._httpClient.get<PaginatedSubmissionsRes>(ApiEndPoints.SUBMISSIONS, { params })
      .pipe(
        map(res => this._paginatedAdaptor.adapt(res))
      );
  }

  getSubmissionById(id: string): Observable<SubmissionDetailsRes> {
    return this._httpClient.get<SubmissionDetailsRes>(`${ApiEndPoints.SUBMISSIONS}/${id}`);
  }
}
