import { Entity } from "..";

export type CreateUserRequest = {
  userName: string;
  imageUrl: string;
};
export type CreateUserResponse = {
  data: Entity.User;
};

export type GetUserRequest = {
  id: string;
};
export type GetUserResponse = {
  data: Entity.User;
};

export type GetUsersResponse = {
  data: Array<Entity.User>;
};
