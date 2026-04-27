export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface AnswerReq {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
  exam: {
    id: string;
    title: string;
  };
}

export interface QuestionReq {
  text: string;
  examId?: string; // Optional if bulk adding to a specific exam URL
  answers: AnswerReq[];
}

export interface QuestionRes {
  question: Question;
}

export interface ExamQuestionsRes {
  status: boolean;
  code: number;
  payload: {
    questions: Question[];
  };
}

export interface BulkQuestionsReq {
  questions: QuestionReq[];
}

export interface BulkQuestionsRes {
  message: string;
  questions: Question[];
  count: number;
}
