// Data Access Layer for the Users
// This will contain all the database queries

import crypto from "crypto";
import { NewUser, Roles, UserModel } from "./users.models";
import { ExceptionSafe, dalExceptionHandler } from "../../toolkit";

// Mocked Data

const Users = [
  {
    id: "8D31B96A-02AC-4531-976F-A455686F8FE2",
    name: "John Doe",
    email: "john.doe@rebeldot.com",
    role: Roles.USER,
  },
  {
    id: "123e4567-e89b-12d3-a456-426655440000",
    name: "Jane Doe",
    email: "jane.doe@rebeldot.com",
    role: Roles.ADMIN,
  },
];

@ExceptionSafe(dalExceptionHandler)
export default class UsersDal {
  public static getUsersList(): UserModel[] {
    return Users;
  }

  public static getUserById(userId: string): UserModel | null {
    return Users.find((user) => user.id === userId) || null;
  }

  public static getUserByEmail(email: string): UserModel | null {
    return Users.find((user) => user.email === email) || null;
  }

  public static addNewUser(userDetails: NewUser): UserModel | null {
    const newUser: UserModel = { ...userDetails, id: crypto.randomUUID() }; // The ID would normally be added by the DB engine

    Users.push(newUser);
    return newUser;
  }
}
