import { Router, Request, Response } from 'express'
import PetsController from './pets.controller'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const { statusCode, body } = await PetsController.getPets(req)
  res.status(statusCode).send(body)
})

//underAge pets
router.get('/filter', async (req: Request, res: Response) => {
  const {age}=req.query;
  const { statusCode, body } = await PetsController.getPetsUnderAge(req,Number(age))
  res.status(statusCode).send(body)
})


router.get('/:petId', async (req: Request, res: Response) => {
  const { petId } = req.params
  const { statusCode, body } = await PetsController.getPetById(req, petId)
  res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const { statusCode, body } = await PetsController.addPet(req, req.body)
  res.status(statusCode).send(body)
})


router.delete('/:petId', async (req: Request, res: Response)=>{
    const {petId} =req.params;
    const {statusCode,body}= await PetsController.deletePet(req,petId);
    res.status(statusCode).send(body);
})

router.put('/', async (req: Request, res: Response) => {
    const { statusCode, body } = await PetsController.updatePet(req, req.body)
    res.status(statusCode).send(body)
  })

router.post('/login',async (req:Request,res:Response)=>{
  const { statusCode, body } = await PetsController.loginPet(req, req.body)
    res.status(statusCode).send(body)
})

export default router

