import { PaginatedResponse } from './pagination.model';

export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: {
    id: string;
    title: string;
  };
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExamReq {
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
}

export interface ExamRes {
  exam: Exam;
}

export type PaginatedExamsRes = PaginatedResponse<Exam>;
