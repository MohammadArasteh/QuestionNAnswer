import { DateTime } from "./DateTime";

export enum AnswerReactionType {
  NONE,
  LIKED,
  DISLIKED,
}

export type Answer = {
  id: number;
  userId: number;
  questionId: number;
  body: string;
  likedIds: Array<number>;
  dislikedIds: Array<number>;
  dateTime: DateTime;
};
