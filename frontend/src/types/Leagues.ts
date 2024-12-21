export interface League {
  id: number;
  name: string;
  id_user: number;
}

export interface LeagueView {
  id: number;
  name: string;
  name_User: string;
}

export interface LeagueDto {
  name: string;
  idUser: number;
}

export interface RawLeague {
  id: number;
  name: string;
}
