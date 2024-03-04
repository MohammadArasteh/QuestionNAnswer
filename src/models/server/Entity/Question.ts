import { DateTime } from "./DateTime";

export type Question = {
  id: string;
  title: string;
  userId: string;
  body: string;
  answersCount: number;
  dateTime: DateTime;
};
