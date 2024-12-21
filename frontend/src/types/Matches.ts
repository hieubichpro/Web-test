export interface Match {
  id: number;
  nameHome: string;
  goalHome: number;
  goalGuest: number;
  nameGuest: string;
}

export interface MatchDto {
  id_home: number;
  id_guest: number;
  id_league: number;
  goal_home: number;
  goal_guest: number;
}

export interface PatchMatchDto {
  goal_home: number;
  goal_guest: number;
}
