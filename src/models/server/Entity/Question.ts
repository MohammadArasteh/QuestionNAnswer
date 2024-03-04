import { DateTime } from "./DateTime";

export type Question = {
  id: number;
  title: string;
  userId: number;
  body: string;
  answersCount: number;
  dateTime: DateTime;
};
