import container from '../container'
import express from 'express'
import { mountRoutes } from './routes'
import Config from '../config/Config'
import { errorHandler } from './middleware/error-handler'

const config: Config = container.get('Shared.Config')

const app: express.Application = express()

// Middlewares
app.use(express.json())

// Mount routes
mountRoutes(app)

// Set error handler
errorHandler(app)

app.listen(config.get().server.port, () => console.log(`API listening on port: ${config.get().server.port}`))
