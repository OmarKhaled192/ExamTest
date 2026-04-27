import { PaginatedResponse } from './pagination.model';

export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiplomaReq {
  title: string;
  description: string;
  image: string;
}

export interface DiplomaRes {
  diploma: Diploma;
}

export type PaginatedDiplomasRes = PaginatedResponse<Diploma>;
