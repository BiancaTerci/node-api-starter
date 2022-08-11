import {ObjectId} from 'mongodb'
export enum Species {
    DOG = 'DOG',
    CAT = 'CAT',
    MOUSE = 'MOUSE',
    FROG = 'FROG',
}

export interface PetModel {
    _id?: ObjectId
    name: string
    age: number
    species: Species
    password: string
}

export interface NewPet {
    name: string
    age: number
    species: Species
    password: string
}

export interface LoginPet{
    name: string
    password:string
}


