import { Question } from "../Entity";

export type CreateQuestionRequest = {
  userId: string;
  title: string;
  body: string;
};

export type CreateQuestionResponse = {
  data: Question;
  message: string;
};

export type GetQuestionsResponse = {
  data: Array<Question>;
};

export type GetQuestionRequest = {
  questionId: string;
};
export type GetQuestionResponse = {
  data: Question | null;
};
