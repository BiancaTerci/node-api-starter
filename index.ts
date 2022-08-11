import express, { Request, Response } from 'express'
import * as swaggerJson from './dist/swagger.json'
import * as swaggerUI from 'swagger-ui-express'
import Modules from './modules'
import config from './config'
import 'dotenv/config'
import { connectToDb, getDb } from './db'
import { Db } from 'mongodb'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(['/docs'], swaggerUI.serve, swaggerUI.setup(swaggerJson))

// use face un middleware layer
app.use('/api/v1', Modules)

app.get('/health', (_req: Request, res: Response) => {
  res.send('Healthy')
})

export let db:Db;
connectToDb((err:string|null) => {
    if (!err) {
        db = getDb();
        console.log("bbb")
    }

})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
  console.log(process.env.CONNECTION_STRING)
})

