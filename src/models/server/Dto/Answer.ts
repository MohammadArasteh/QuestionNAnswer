import { Answer } from "../entity";

export type CreateAnswerRequest = {
  userId: string;
  body: string;
};

export type CreateAnswerResponse = {
  data: Answer;
  message: string;
};

export type GetAnswersRequest = {
  questionId: string;
  pageSize: number;
  pageNumber: number;
};
export type GetAnswersResponse = {
  data: Array<Answer>;
};
