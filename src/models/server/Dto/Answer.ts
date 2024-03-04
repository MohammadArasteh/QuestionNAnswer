import { Entity } from "..";

export type CreateAnswerRequest = {
  questionId: string;
  userId: string;
  body: string;
};

export type CreateAnswerResponse = {
  data: Entity.Answer;
  message: string;
};

export type GetAnswersRequest = {
  questionId: string;
  pageSize?: number;
  pageNumber?: number;
};
export type GetAnswersResponse = {
  data: Array<Entity.Answer>;
};
