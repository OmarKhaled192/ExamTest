import { PaginatedResponse } from './pagination.model';

export interface SubmissionAnswer {
  questionId: string;
  answerId: string;
}

export interface SubmissionReq {
  examId: string;
  answers: SubmissionAnswer[];
  startedAt: string; // ISO 8601 Date String
}

export interface Submission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: {
    id: string;
    title: string;
    duration: number;
  };
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: any;
  isCorrect: boolean;
  correctAnswer: any;
}

export interface SubmissionRes {
  message: string;
  submission: Submission;
  analytics: SubmissionAnalytics[];
}

export interface SubmissionDetailsRes {
  submission: Submission;
  analytics: SubmissionAnalytics[];
}

export type PaginatedSubmissionsRes = PaginatedResponse<Submission>;
