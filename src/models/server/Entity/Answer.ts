import { DateTime } from "./DateTime";

export type Answer = {
  userTitle: string;
  userUrl: string;
  body: string;
  likesCount: number;
  dislikesCount: number;
  dateTime: DateTime;
};
