import container from '../container'
import express from 'express'
import { mountRoutes } from './routes'
import Config from '../config/Config'

const config: Config = container.get('Shared.Config')

const app: express.Application = express()

mountRoutes(app)

app.listen(config.get().server.port, () => console.log(`API listening on port: ${config.get().server.port}`))
