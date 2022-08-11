
import PetsDal from './pets.dal'
import { NewPet, Species, PetModel, LoginPet } from './pets.models'
import { ControllerError, ControllerResponse, ResponseFactory } from '../../toolkit'
import bcrypt from 'bcrypt'
export default class PetsService {
    public static async getPetsList(): Promise<ControllerResponse<PetModel[] | ControllerError>> {
        const pets = await PetsDal.getPetsList()
        return ResponseFactory.createResponse(pets)
    }
    
    public static async getPetById(petId: string): Promise<ControllerResponse<PetModel | ControllerError>> {
        const pet = await PetsDal.getPetById(petId)
        if (!pet) {
            return ResponseFactory.createNotFoundError()
        }

        return ResponseFactory.createResponse(pet)
    }

    private static getSpecies(species: string): Species | undefined {
        if (species === 'DOG')
            return Species.DOG;
        if (species === 'FROG')
            return Species.FROG;
        if (species === 'CAT')
            return Species.CAT;
        if (species === 'MOUSE')
            return Species.MOUSE;
    }

    public static async addPet(petDetails: NewPet): Promise<ControllerResponse<PetModel | ControllerError>> {
        const { name, age, species,password } = petDetails

        const existingPet = await PetsDal.getPetByNameAndSpecies(name, species)
        if (existingPet) {
            return ResponseFactory.createBadRequestError('A pet with this name and species already exists')
        }
        const salt:string = await bcrypt.genSalt(10);
        let hashPassword:string = await bcrypt.hash(petDetails.password, salt);
        const newPet = await PetsDal.addNewPet({ name, age, species,password:hashPassword })

        if (newPet) {
            return ResponseFactory.createResponse(newPet)
        }

        return ResponseFactory.createInternalServerError()
    }

    public static async deletePetById(petId: string): Promise<ControllerResponse<PetModel | ControllerError>> {
        const pet= await PetsDal.deletePet(petId);
        if (!pet) {
            return ResponseFactory.createNotFoundError()
        }
        return ResponseFactory.createResponse(pet)
    }
    
    public static async updatePet(pet: PetModel): Promise<ControllerResponse<PetModel | ControllerError>> {
        const petUpdated= await PetsDal.updatePet(pet);
        if (!petUpdated) {
            return ResponseFactory.createNotFoundError()
        }
        return ResponseFactory.createResponse(petUpdated)
    }

    public static async loginPet(credentials:LoginPet): Promise<ControllerResponse<PetModel | ControllerError>> {
        const pet:PetModel |null= await PetsDal.getPetByName(credentials.name);
        if (!pet) {
            return ResponseFactory.createNotFoundError()
        }
        
        const validPassword = await bcrypt.compare(credentials.password, pet.password);
        if(!validPassword){
            return ResponseFactory.createNotFoundError()
        }

        return ResponseFactory.createResponse(pet)
    }
    
}
