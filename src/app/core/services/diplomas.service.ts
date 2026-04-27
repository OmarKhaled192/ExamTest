import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiEndPoints } from '../enums/api-endpoints';
import { Diploma, DiplomaReq, PaginatedDiplomasRes } from '../models/diploma.model';
import { PaginatedPayload } from '../models/pagination.model';
import { PaginatedAdaptor, SingleAdaptor } from '../adapters/api.adaptor';

@Injectable({
  providedIn: 'root'
})
export class DiplomasService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _paginatedAdaptor = inject(PaginatedAdaptor<Diploma>);
  private readonly _singleAdaptor = inject(SingleAdaptor<Diploma>);

  getDiplomas(page: number = 1, limit: number = 12, sortBy?: string, sortOrder?: string, search?: string): Observable<PaginatedPayload<Diploma>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortOrder) params = params.set('sortOrder', sortOrder);
    if (search) params = params.set('search', search);

    return this._httpClient.get<PaginatedDiplomasRes>(ApiEndPoints.DIPLOMAS, { params })
      .pipe(
        map(res => this._paginatedAdaptor.adapt(res))
      );
  }

  getDiplomaById(id: string): Observable<Diploma> {
    return this._httpClient.get<any>(`${ApiEndPoints.DIPLOMAS}/${id}`)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  createDiploma(data: DiplomaReq): Observable<Diploma> {
    return this._httpClient.post<any>(ApiEndPoints.DIPLOMAS, data)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  updateDiploma(id: string, data: DiplomaReq): Observable<Diploma> {
    return this._httpClient.put<any>(`${ApiEndPoints.DIPLOMAS}/${id}`, data)
      .pipe(
        map(res => this._singleAdaptor.adapt(res))
      );
  }

  deleteDiploma(id: string): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(`${ApiEndPoints.DIPLOMAS}/${id}`);
  }
}
