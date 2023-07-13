import { Roles } from "@routes/types/roles";

type User = {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  roles: Roles[];
}

type UserInfo = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type AuthUser = {
  user: User;
  token: string;
  applicant: number;
}

export type ApplicantInfo = {
  id: number;
}

export type LoginResponse = {
  message: string;
  token: string;
  user: UserInfo;
  applicant: ApplicantInfo;
}
