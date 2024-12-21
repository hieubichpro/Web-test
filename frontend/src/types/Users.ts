export interface RawUserDto {
  login: string;
  password: string;
}

export interface User {
  id: number;
  login: string;
  password: string;
  role: string;
  name: string;
}

export interface RawChangePassword {
  password: string;
}

export interface RawSignUp {
  login: string;
  password: string;
  role: string;
  name: string;
}
