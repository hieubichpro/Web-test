import { MatchService } from "../services/MatchService";
import { API } from "../services/API";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(API);

describe("MatchService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should get all matches", async () => {
    const matches = [
      { id: "1", homeTeam: "Team A", awayTeam: "Team B", score: "1-0" },
      { id: "2", homeTeam: "Team C", awayTeam: "Team D", score: "2-2" },
    ];
    mock.onGet("/matches").reply(200, matches);

    const response = await MatchService.getAll();
    expect(response.status).toBe(200);
    expect(response.data).toEqual(matches);
  });

  it("should get match by id", async () => {
    const match = {
      id: "1",
      homeTeam: "Team A",
      awayTeam: "Team B",
      homeGoal: "1",
      homeGuest: "0",
    };
    mock.onGet("/matches/1").reply(200, match);

    const response = await MatchService.getById("1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual(match);
  });

  it("should create a match", async () => {
    const dto = {
      id_home: 1,
      id_guest: 2,
      id_league: 1,
      goal_home: 1,
      goal_guest: 0,
    };
    const createdMatch = {
      id: "3",
      homeTeam: "Team A",
      awayTeam: "Team B",
      homeGoal: "1",
      homeGuest: "0",
    };
    mock.onPost("/matches", dto).reply(201, createdMatch);

    const response = await MatchService.create(dto);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(createdMatch);
  });

  it("should delete a match", async () => {
    mock.onDelete("/matches/1").reply(204);

    const response = await MatchService.delete("1");
    expect(response.status).toBe(204);
  });

  it("should update a match", async () => {
    const dto = { goal_home: 1, goal_guest: 1 };
    mock.onPatch("/matches/1", dto).reply(200);

    const response = await MatchService.update("1", dto);
    expect(response.status).toBe(200);
  });
});
