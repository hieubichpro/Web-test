import { AxiosResponse } from "axios";
import { API } from "./API";
import { User, RawUserDto, RawChangePassword, RawSignUp } from "../types/Users";
import { LeagueView } from "../types/Leagues";
import { deleteUser, setUser } from "../utils/UserUtils";

export class UserService {
  public static getAll(): Promise<AxiosResponse<User[]>> {
    return API.get("/users");
  }

  public static getById(id: string): Promise<AxiosResponse<User>> {
    return API.get(`/users/${id}`);
  }

  public static async sign_in(credentials: RawUserDto) {
    const res = await API.post("/users/sign-in", credentials);

    setUser(res.data);
    return res;
  }

  public static sign_out() {
    deleteUser();
  }

  public static sign_up(dto: RawSignUp): Promise<AxiosResponse> {
    return API.post("/users/sign-up", dto);
  }

  public static delete(id: string): Promise<AxiosResponse> {
    return API.delete(`/users/${id}`);
  }

  public static change_pass(
    id: string,
    dto: RawChangePassword
  ): Promise<AxiosResponse> {
    return API.patch(`/users/${id}`, dto);
  }

  public static get_leagues(id: string): Promise<AxiosResponse<LeagueView[]>> {
    return API.get(`/users/${id}/leagues`);
  }
}
