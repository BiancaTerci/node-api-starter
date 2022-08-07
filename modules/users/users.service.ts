// This file will contain all the logic of the routes

import UsersDal from './users.dal'
import { AddUserBody, Roles, UserModel } from './users.models'
import { ControllerError, ControllerResponse, ResponseFactory } from '../../toolkit'

export default class UsersService {
  public static async getUsersList(): Promise<ControllerResponse<UserModel[] | ControllerError>> {
    const users = await UsersDal.getUsersList()
    return ResponseFactory.createResponse(users)
  }

  public static async getUserById(userId: string): Promise<ControllerResponse<UserModel | ControllerError>> {
    const user = await UsersDal.getUserById(userId)
    if (!user) {
      return ResponseFactory.createNotFoundError()
    }

    return ResponseFactory.createResponse(user)
  }

  public static async addUser(userDetails: AddUserBody): Promise<ControllerResponse<UserModel | ControllerError>> {
    const { name, email } = userDetails

    const existingUser = await UsersDal.getUserByEmail(email)
    if (existingUser) {
      return ResponseFactory.createBadRequestError('A user with this already exists')
    }

    const newUser = await UsersDal.addNewUser({ name, email, role: Roles.USER })

    if (newUser) {
      return ResponseFactory.createResponse(newUser)
    }

    return ResponseFactory.createInternalServerError()
  }
}
