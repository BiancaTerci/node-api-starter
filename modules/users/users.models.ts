export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserModel {
  id: string
  name: string
  email: string
  role: Roles
}

export interface AddUserBody {
  name: string
  email: string
}

export interface NewUser {
  name: string
  email: string
  role: Roles
}
