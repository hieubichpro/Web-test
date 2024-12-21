import { User } from "../types/Users";

export const getUser = (): User | undefined => {
  let str = localStorage.getItem("user");
  let user: User | undefined = str ? JSON.parse(str) : undefined;
  return user;
};

export const deleteUser = () => {
  localStorage.removeItem("user");
};

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};
