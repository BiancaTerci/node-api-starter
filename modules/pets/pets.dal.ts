
import crypto from "crypto";
import { NewPet, Species, PetModel, LoginPet } from "./pets.models";
import { ExceptionSafe, dalExceptionHandler } from "../../toolkit";
import {db} from "../../index"
import {Db,ObjectId} from 'mongodb'
// Mocked Data

const Pets = [
  {
    id: "8D31B96A-02AC-4531-976F-A455686F8FE2",
    name: "Bibi",
    age: 10,
    species: Species.DOG,
  },
  {
    id: "8D3178AB-02AC-4531-976F-A4545C6F8FE2",
    name: "Mickey",
    age: 100,
    species: Species.MOUSE,
  },
];

@ExceptionSafe(dalExceptionHandler)
export default class PetsDal {
  public static async getPetsList(): Promise<PetModel[]> {
   // return Pets;
   let pets:PetModel[]=[];
   pets=(await db.collection('pets').find().toArray()) as unknown as PetModel[];
   return pets;
  
  }

  public static async getPetById(petId: string): Promise<PetModel | null> {
    let pet:PetModel=await db.collection('pets').findOne({ _id: new ObjectId(petId) }) as unknown as PetModel
    return pet;
  }

  public static async getPetByNameAndSpecies(name: string, species:Species): Promise<PetModel | null> {
    let pet:PetModel=await db.collection('pets').findOne({ name:name,species:species }) as unknown as PetModel
    return pet;
  }

  public static async addNewPet(petDetails: NewPet): Promise<PetModel | null> {
    let result=await db.collection('pets').insertOne(petDetails);
    const newPet: PetModel = { ...petDetails }; // The ID would normally be added by the DB engine

    return newPet;
  }

  public static async deletePet(petId: string): Promise<PetModel | null> {
    let petToBeDeleted:PetModel=await db.collection('pets').findOne({ _id: new ObjectId(petId) }) as unknown as PetModel
    await db.collection('pets').deleteOne({_id:new ObjectId(petId)});
    return petToBeDeleted;
  }

  public static async updatePet(pet: PetModel):Promise<PetModel | null>{
    let petToBeUpdated:PetModel=await db.collection('pets').findOne({ _id: new ObjectId(pet._id) }) as unknown as PetModel
    console.log(petToBeUpdated)
    if(petToBeUpdated===null)
        return null;
    let properties={...pet};
    delete properties._id;
    await db.collection('pets').updateOne({ _id: new ObjectId(pet._id)},{$set:properties});
    return pet;
  }

  public static async getPetByName(name:string): Promise<PetModel | null> {
    let pet:PetModel=await db.collection('pets').findOne({ name:name}) as unknown as PetModel
    return pet;
  }

/*
  public static getPetById(petId: string): PetModel | null {
    return Pets.find((pet) => pet.id === petId) || null;
  }

  public static getPetByNameAndSpecies(name: string, species:Species): PetModel | null {
    return Pets.find((pet) => pet.name === name && pet.species === species) || null;
  }

  public static addNewPet(petDetails: NewPet): PetModel | null {
    const newPet: PetModel = { ...petDetails, id: crypto.randomUUID() }; // The ID would normally be added by the DB engine

    Pets.push(newPet);
    return newPet;
  }

  public static deletePet(petId: string): PetModel | null {
    let petToBeDeleted=null;
    for(let pet of Pets){
        if(pet.id===petId)
        {
            let index=Pets.indexOf(pet);
            petToBeDeleted=pet;
            Pets.splice(index,1);
        }
    }
    return petToBeDeleted;
  }

  public static updatePet(pet: PetModel):PetModel|null{
    if(Pets.find((exisingPet) => pet.id === exisingPet.id)===null)
        return null;
    for(let i=0;i<Pets.length;i++)
    {
        if(Pets[i].id===pet.id)
            Pets[i]=pet;
    }
    return pet;
  }
  */
}
