import { Server } from "@/models";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function selectRandom<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length)];
}

export async function sleep(ms = 2000) {
  return new Promise((res) => setTimeout(res, ms));
}

export function getTime(dateTime: Server.Entity.DateTime): string {
  return new DateObject({
    date: dateTime,
    calendar: persian,
    locale: persian_fa,
  })
    .setFormat("HH:mm")
    .toString();
}
export function getDate(dateTime: Server.Entity.DateTime): string {
  return new DateObject({
    date: dateTime,
    calendar: persian,
    locale: persian_fa,
  })
    .setFormat("YYYY/MM/DD")
    .toString();
}

export function getValue(object: any, path: string) {
  const keys = path.split(".");
  let value = object;
  for (const key of keys) {
    if (value[key]) value = value[key];
    else return undefined;
  }
  return value;
}
