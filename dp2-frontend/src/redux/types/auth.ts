import { Roles } from "@routes/types/roles";

type User = {
  email: string;
  password: string;
  roles: Roles[];
}

export type AuthUser = {
  user: User;
  token: string;
}


export type LoginResponse = {
  message: string;
  token: string;
}
