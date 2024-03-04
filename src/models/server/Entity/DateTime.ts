// example: 2023-11-19T11:34:47
export type DateTime = `${number}-${number}-${number}${
  | `T${number}:${number}:${number}`
  | ""}`;
