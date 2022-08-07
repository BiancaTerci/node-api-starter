import express, { Request, Response } from 'express'
import * as swaggerJson from './dist/swagger.json'
import * as swaggerUI from 'swagger-ui-express'
import Modules from './modules'
import config from './config'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(['/docs'], swaggerUI.serve, swaggerUI.setup(swaggerJson))

app.use('/api/v1', Modules)

app.get('/health', (_req: Request, res: Response) => {
  res.send('Healthy')
})

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`)
})
