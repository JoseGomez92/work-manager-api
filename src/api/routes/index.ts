import express, { Router } from 'express'
import glob from 'glob'

export const mountRoutes = (app: express.Application) => {
    const router = Router()
    files().forEach((file) => require(file).mount(router))
    app.use(router)
}

const files = (): Array<string> => {
    const extension = '**/*.routes.*'

    return glob.sync(`${__dirname}/${extension}`)
}
