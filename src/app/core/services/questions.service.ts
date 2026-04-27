import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiEndPoints } from '../enums/api-endpoints';
import { Question, QuestionReq, ExamQuestionsRes, BulkQuestionsReq, BulkQuestionsRes } from '../models/question.model';
import { SingleAdaptor } from '../adapters/api.adaptor';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _singleAdaptor = inject(SingleAdaptor<Question>);

  getExamQuestions(examId: string, sortBy?: string, sortOrder?: string, search?: string): Observable<Question[]> {
    let params = new HttpParams();
    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortOrder) params = params.set('sortOrder', sortOrder);
    if (search) params = params.set('search', search);

    return this._httpClient.get<ExamQuestionsRes>(`${ApiEndPoints.QUESTIONS}/exam/${examId}`, { params })
      .pipe(
        map(res => res?.payload?.questions || [])
      );
  }

  getQuestionById(id: string): Observable<Question> {
    return this._httpClient.get<any>(`${ApiEndPoints.QUESTIONS}/${id}`)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  createQuestion(data: QuestionReq): Observable<Question> {
    return this._httpClient.post<any>(ApiEndPoints.QUESTIONS, data)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  addBulkQuestions(examId: string, data: BulkQuestionsReq): Observable<BulkQuestionsRes> {
    return this._httpClient.post<BulkQuestionsRes>(`${ApiEndPoints.QUESTIONS}/exam/${examId}/bulk`, data);
  }

  updateQuestion(id: string, data: QuestionReq): Observable<Question> {
    return this._httpClient.put<any>(`${ApiEndPoints.QUESTIONS}/${id}`, data)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  deleteQuestion(id: string): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(`${ApiEndPoints.QUESTIONS}/${id}`);
  }
}
