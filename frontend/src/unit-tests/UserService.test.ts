import { UserService } from "../services/UserService";
import { API } from "../services/API";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(API);

describe("User Service", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should get all users", async () => {
    const users = [{ id: "1", name: "John Doe" }];
    mock.onGet("/users").reply(200, users);

    const response = await UserService.getAll();
    expect(response.status).toBe(200);
    expect(response.data).toEqual(users);
  });

  it("should get user by id", async () => {
    const user = { id: "1", name: "John Doe" };
    mock.onGet("/users/1").reply(200, user);

    const response = await UserService.getById("1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual(user);
  });

  it("should sign in a user", async () => {
    const credentials = { login: "test@example.com", password: "password" };
    const user = { id: "1", name: "John Doe" };
    mock.onPost("/users/sign-in", credentials).reply(200, user);

    const response = await UserService.sign_in(credentials);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(user);
  });

  it("should sign up a user", async () => {
    const dto = {
      login: "test@example.com",
      password: "password",
      role: "Admin",
      name: "Hieu",
    };
    mock.onPost("/users/sign-up", dto).reply(201);

    const response = await UserService.sign_up(dto);
    expect(response.status).toBe(201);
  });

  it("should delete a user", async () => {
    mock.onDelete("/users/1").reply(204);

    const response = await UserService.delete("1");
    expect(response.status).toBe(204);
  });

  it("should change user password", async () => {
    const dto = { password: "new" };
    mock.onPatch("/users/1", dto).reply(200);

    const response = await UserService.change_pass("1", dto);
    expect(response.status).toBe(200);
  });

  it("should get leagues for a user", async () => {
    const leagues = [{ id: "1", name: "League 1" }];
    mock.onGet("/users/1/leagues").reply(200, leagues);

    const response = await UserService.get_leagues("1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual(leagues);
  });
});
