import { DateTime } from "./DateTime";

export type Question = {
  id: string;
  title: string;
  userUrl: string;
  body: string;
  answersCount: number;
  dateTime: DateTime;
};
