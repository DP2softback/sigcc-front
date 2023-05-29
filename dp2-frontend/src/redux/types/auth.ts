export type AuthUser = {
  user: User;
  token: string;
}

type User = {
  email: string;
  password: string;
}