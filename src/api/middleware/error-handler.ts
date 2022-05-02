import express, { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import InvalidValueError from '../../modules/shared/domain/error/InvalidValueError'
import ValueNotDefined from '../../modules/shared/domain/error/ValueNotDefined'

export const errorHandler = (app: express.Application) => {
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        switch (true) {
            case err.name === InvalidValueError.name:
            case err.name === ValueNotDefined.name:
                res.status(httpStatus.BAD_REQUEST).send({ error: err.message })
                break
            default:
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
                break
        }
    })
}
