import { LeagueService } from "../services/LeagueService";
import { API } from "../services/API";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(API);

describe("LeagueService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should get all leagues", async () => {
    const leagues = [
      { id: 1, name: "League 1" },
      { id: 2, name: "League 2" },
    ];
    mock.onGet("/leagues").reply(200, leagues);

    const response = await LeagueService.getAll();
    expect(response.status).toBe(200);
    expect(response.data).toEqual(leagues);
  });

  it("should get league by id", async () => {
    const league = { id: "1", name: "League 1" };
    mock.onGet("/leagues/1").reply(200, league);

    const response = await LeagueService.getById("1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual(league);
  });

  it("should create a league", async () => {
    const dto = { name: "New League", idUser: 1 };
    const createdLeague = { id: "3", name: "New League" };
    mock.onPost("/leagues", dto).reply(201, createdLeague);

    const response = await LeagueService.create(dto);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(createdLeague);
  });

  it("should delete a league", async () => {
    mock.onDelete("/leagues/1").reply(204);

    const response = await LeagueService.delete("1");
    expect(response.status).toBe(204);
  });

  it("should update a league", async () => {
    const dto = { name: "Updated League", idUser: 1 };
    mock.onPut("/leagues/1", dto).reply(200);

    const response = await LeagueService.update("1", dto);
    expect(response.status).toBe(200);
  });

  it("should get clubs for a league", async () => {
    const clubs = [
      { id: "1", name: "Club 1" },
      { id: "2", name: "Club 2" },
    ];
    mock.onGet("/leagues/1/clubs").reply(200, clubs);

    const response = await LeagueService.get_clubs("1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual(clubs);
  });

  it("should get matches for a league", async () => {
    const matches = [{ id: "1", homeTeam: "Team A", awayTeam: "Team B" }];
    mock.onGet("/leagues/1/matches").reply(200, matches);

    const response = await LeagueService.get_matches("1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual(matches);
  });
});
