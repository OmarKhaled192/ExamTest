import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiEndPoints } from '../enums/api-endpoints';
import { Exam, ExamReq, PaginatedExamsRes } from '../models/exam.model';
import { PaginatedPayload } from '../models/pagination.model';
import { PaginatedAdaptor, SingleAdaptor } from '../adapters/api.adaptor';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _paginatedAdaptor = inject(PaginatedAdaptor<Exam>);
  private readonly _singleAdaptor = inject(SingleAdaptor<Exam>);

  getExams(page: number = 1, limit: number = 12, diplomaId?: string, sortBy?: string, sortOrder?: string, search?: string): Observable<PaginatedPayload<Exam>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (diplomaId) params = params.set('diplomaId', diplomaId);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortOrder) params = params.set('sortOrder', sortOrder);
    if (search) params = params.set('search', search);

    return this._httpClient.get<PaginatedExamsRes>(ApiEndPoints.EXAMS, { params })
      .pipe(
        map(res => this._paginatedAdaptor.adapt(res))
      );
  }

  getExamById(id: string): Observable<Exam> {
    return this._httpClient.get<any>(`${ApiEndPoints.EXAMS}/${id}`)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  createExam(data: ExamReq): Observable<Exam> {
    return this._httpClient.post<any>(ApiEndPoints.EXAMS, data)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  updateExam(id: string, data: ExamReq): Observable<Exam> {
    return this._httpClient.put<any>(`${ApiEndPoints.EXAMS}/${id}`, data)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  deleteExam(id: string): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(`${ApiEndPoints.EXAMS}/${id}`);
  }
}
