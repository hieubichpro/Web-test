import { AxiosResponse } from "axios";
import { API } from "./API";
import { Match, MatchDto, PatchMatchDto } from "../types/Matches";

export class MatchService {
  public static getAll(): Promise<AxiosResponse<Match[]>> {
    return API.get("/matches");
  }

  public static getById(id: string): Promise<AxiosResponse<Match>> {
    return API.get(`/matches/${id}`);
  }

  public static create(dto: MatchDto): Promise<AxiosResponse<Match>> {
    return API.post("/matches", dto);
  }

  public static delete(id: string): Promise<AxiosResponse> {
    return API.delete(`/matches/${id}`);
  }

  public static update(id: string, dto: PatchMatchDto): Promise<AxiosResponse> {
    return API.patch(`/matches/${id}`, dto);
  }
}
