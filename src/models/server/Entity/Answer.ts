import { DateTime } from "./DateTime";

export type Answer = {
  id: string;
  userId: string;
  questionId: string;
  body: string;
  likesCount: number;
  dislikesCount: number;
  dateTime: DateTime;
};
