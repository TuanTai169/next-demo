export type Role = 'admin' | 'user';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role?: Role;
}
