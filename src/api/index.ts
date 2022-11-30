import container from '../container'
import express from 'express'
import cors from 'cors'
import { mountRoutes } from './routes'
import Config from '../config/Config'
import { errorHandler } from './middleware/error-handler'

async function start() {
    const config: Config = container.get('Shared.Config')

    const app: express.Application = express()

    // Init TypeORM
    await container.get('Shared.TypeORM').init()

    // Middlewares
    app.use(express.json())
    app.use(cors())

    // Mount routes
    mountRoutes(app)

    // Set error handler
    errorHandler(app)

    app.listen(config.get().server.port, () => console.log(`API listening on port: ${config.get().server.port}`))
}

start()
