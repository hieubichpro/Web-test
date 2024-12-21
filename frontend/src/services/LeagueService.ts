import { AxiosResponse } from "axios";
import { API } from "./API";
import { League, LeagueDto, RawLeague, LeagueView } from "../types/Leagues";
import { Club } from "../types/Clubs";
import { Match } from "../types/Matches";

export class LeagueService {
  public static getAll(): Promise<AxiosResponse<LeagueView[]>> {
    return API.get("/leagues");
  }

  public static getById(id: string): Promise<AxiosResponse<League>> {
    return API.get(`/leagues/${id}`);
  }

  public static create(dto: LeagueDto): Promise<AxiosResponse<League>> {
    return API.post("/leagues", dto);
  }

  public static delete(id: string): Promise<AxiosResponse> {
    return API.delete(`/leagues/${id}`);
  }

  public static update(id: string, dto: LeagueDto): Promise<AxiosResponse> {
    return API.put(`/leagues/${id}`, dto);
  }

  public static get_clubs(id: string): Promise<AxiosResponse<Club[]>> {
    return API.get(`/leagues/${id}/clubs`);
  }

  public static get_matches(id: string): Promise<AxiosResponse<Match[]>> {
    return API.get(`/leagues/${id}/matches`);
  }
}
