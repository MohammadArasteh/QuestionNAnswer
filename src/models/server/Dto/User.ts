import { Entity } from "..";

export type CreateUserRequest = {
  id?: number;
  userName: string;
  imageUrl: string;
};
export type CreateUserResponse = {
  data: Entity.User;
};

export type GetUserRequest = {
  id: number;
};
export type GetUserResponse = {
  data: Entity.User;
};

export type GetUsersResponse = {
  data: Array<Entity.User>;
};
