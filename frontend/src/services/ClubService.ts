import { AxiosResponse } from "axios";
import { API } from "./API";
import { Club, ClubDto } from "../types/Clubs";

export class ClubService {
  public static getAll(start_with?: string): Promise<AxiosResponse<Club[]>> {
    return API.get("/clubs", { params: { start_with: start_with } });
  }

  public static getById(id: string): Promise<AxiosResponse<Club>> {
    return API.get(`/clubs/${id}`);
  }

  public static create(dto: ClubDto): Promise<AxiosResponse<Club>> {
    return API.post("/clubs", dto);
  }

  public static delete(id: string): Promise<AxiosResponse> {
    return API.delete(`/clubs/${id}`);
  }

  public static update(id: string, dto: ClubDto): Promise<AxiosResponse> {
    return API.put(`/clubs/${id}`, dto);
  }
}
