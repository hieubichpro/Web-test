import { ClubService } from "../services/ClubService";
import { API } from "../services/API";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Club, ClubDto } from "../types/Clubs";

const mock = new MockAdapter(API);

describe("ClubService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should get all clubs", async () => {
    const clubs = [
      { id: "1", name: "Club 1" },
      { id: "2", name: "Club 2" },
    ];
    mock.onGet("/clubs").reply(200, clubs);

    const response = await ClubService.getAll();
    expect(response.status).toBe(200);
    expect(response.data).toEqual(clubs);
  });

  it("should get club by id", async () => {
    const club = { id: "1", name: "Club 1" };
    mock.onGet("/clubs/1").reply(200, club);

    const response = await ClubService.getById("1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual(club);
  });

  it("should create a club", async () => {
    const dton = { name: "New Club", id_league: 1 };
    const createdClub = { id: "3", name: "New Club" };
    mock.onPost("/clubs", dton).reply(201, createdClub);

    const response = await ClubService.create(dton);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(createdClub);
  });

  it("should delete a club", async () => {
    mock.onDelete("/clubs/1").reply(204);

    const response = await ClubService.delete("1");
    expect(response.status).toBe(204);
  });

  it("should update a club", async () => {
    const dto = { name: "Updated Club", id_league: 3 };
    mock.onPut("/clubs/1", dto).reply(200);

    const response = await ClubService.update("1", dto);
    expect(response.status).toBe(200);
  });
});
