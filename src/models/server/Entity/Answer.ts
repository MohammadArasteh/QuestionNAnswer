import { DateTime } from "./DateTime";

export type Answer = {
  id: number;
  userId: number;
  questionId: number;
  body: string;
  likesCount: number;
  dislikesCount: number;
  dateTime: DateTime;
};
