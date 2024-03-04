import { Server } from "@/models";
import { Entity } from "..";

export type Answer = {
  id: number;
  userId: number;
  questionId: number;
  body: string;
  likesCount: number;
  dislikesCount: number;
  userReaction: Server.Entity.AnswerReactionType;
  dateTime: Server.Entity.DateTime;
};

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
  currentUserId: number;
  questionId: number;
  pageSize?: number;
  pageNumber?: number;
};
export type GetAnswersResponse = {
  data: Array<Answer>;
  totalCount: number;
};

export type AnswerReactionRequest = {
  answerId: number;
  userId: number;
  reaction: Server.Entity.AnswerReactionType;
};
export type AnswerReactionResponse = {
  data: Answer;
};
