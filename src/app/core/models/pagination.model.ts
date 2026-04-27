export interface PaginationMetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedPayload<T> {
  data: T[];
  metadata: PaginationMetaData;
}

export interface PaginatedResponse<T> {
  status: boolean;
  code: number;
  payload: PaginatedPayload<T>;
}
