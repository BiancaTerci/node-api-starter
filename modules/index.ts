import express from 'express'
const app = express()



import PetsRouter from './pets/pets.router'
app.use('/pets/', PetsRouter)

import UsersRouter from './users/users.router'
app.use('/users/', UsersRouter)

export default app
