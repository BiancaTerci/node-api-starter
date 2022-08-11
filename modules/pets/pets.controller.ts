
import { Request, Response, Tags, Route, Get, Post, Body, Path, Delete, Put } from 'tsoa'
import { Request as ExpressRequest } from 'express'
import {
  ControllerResponse,
  ControllerError,
  ExceptionSafe,
  controllerExceptionHandler,
  ErrorMessageCode,
} from '../../toolkit'
import { LoginPet, NewPet, PetModel } from './pets.models'
import PetsService from './pets.service'

@Tags('Pets')
@Route('pets')
@ExceptionSafe(controllerExceptionHandler) // Wraps every method in a try-catch that returns a server error
export default class PetsController {
  @Get('/')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async getPets(
    @Request() _request: ExpressRequest
  ): Promise<ControllerResponse<PetModel[] | ControllerError>> {
    return await PetsService.getPetsList()
  }

  
  @Get('/{petId}')
  @Response<{ message: ErrorMessageCode.NOT_FOUND }>(404, 'Not Found')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async getPetById(
    @Request() _request: ExpressRequest,
    @Path() petId: string
  ): Promise<ControllerResponse<PetModel | ControllerError>> {
    return await PetsService.getPetById(petId)
  }

  @Post('/')
  @Response<{ message: ErrorMessageCode.BAD_REQUEST }>(400, 'Bad Request')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async addPet(
    @Request() _request: ExpressRequest,
    @Body() petDetails: NewPet
  ): Promise<ControllerResponse<PetModel | ControllerError>> {
    return await PetsService.addPet(petDetails)
  }

  @Post('/login')
  @Response<{ message: ErrorMessageCode.BAD_REQUEST }>(400, 'Bad Request')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async loginPet(
    @Request() _request: ExpressRequest,
    @Body() petDetails: LoginPet
  ): Promise<ControllerResponse<PetModel | ControllerError>> {
    return await PetsService.loginPet(petDetails)
  }

  @Delete('/{petId}')
  @Response<{ message: ErrorMessageCode.NOT_FOUND }>(404, 'Not Found')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async deletePet(
    @Request() _request: ExpressRequest,
    @Path() petId: string
  ):Promise<ControllerResponse<PetModel | ControllerError>>{
    return await PetsService.deletePetById(petId);
  }

  @Put('/')
  @Response<{ message: ErrorMessageCode.BAD_REQUEST }>(400, 'Bad Request')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async updatePet(
    @Request() _request: ExpressRequest,
    @Body() petUpdated: PetModel
  ): Promise<ControllerResponse<PetModel | ControllerError>> {
    return await PetsService.updatePet(petUpdated)
  }
  

}


