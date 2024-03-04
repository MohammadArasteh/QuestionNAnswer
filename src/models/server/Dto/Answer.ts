import { Entity } from "..";

export type CreateAnswerRequest = {
  questionId: number;
  userId: number;
  body: string;
};

export type CreateAnswerResponse = {
  data: Entity.Answer;
  message: string;
};

export type GetAnswersRequest = {
  questionId: number;
  pageSize?: number;
  pageNumber?: number;
};
export type GetAnswersResponse = {
  data: Array<Entity.Answer>;
};
