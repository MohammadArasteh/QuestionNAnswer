import { Entity } from "..";

export type CreateQuestionRequest = {
  userId: string;
  title: string;
  body: string;
};

export type CreateQuestionResponse = {
  data: Entity.Question;
  message: string;
};

export type GetQuestionsResponse = {
  data: Array<Entity.Question>;
};

export type GetQuestionRequest = {
  questionId: string;
};
export type GetQuestionResponse = {
  data: Entity.Question | null;
};
