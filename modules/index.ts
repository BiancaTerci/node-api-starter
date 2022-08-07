import express from 'express'
const app = express()

import UsersRouter from './users/users.router'
app.use('/users/', UsersRouter)

export default app
