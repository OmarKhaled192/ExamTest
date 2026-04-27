import { Injectable } from '@angular/core';
import { PaginatedResponse, PaginatedPayload } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PaginatedAdaptor<T> {
  adapt(data: PaginatedResponse<T>): PaginatedPayload<T> {
    return data?.payload || { data: [], metadata: { page: 1, limit: 12, total: 0, totalPages: 1 } };
  }
}

@Injectable({
  providedIn: 'root'
})
export class SingleAdaptor<T> {
  adapt(data: any): T {
    // Assuming the data is wrapped in a property like `diploma`, `exam`, `question`, etc.
    // So if the response is { diploma: { ... } }, it returns that inner object.
    const keys = Object.keys(data).filter(k => k !== 'status' && k !== 'code' && k !== 'message');
    if (keys.length > 0) {
      return data[keys[0]];
    }
    return data;
  }
}
