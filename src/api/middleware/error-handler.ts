import express, { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import InvalidValueError from '../../modules/shared/domain/error/InvalidValueError'
import ResourceConflict from '../../modules/shared/domain/error/ResourceConflict'
import ResourceNotFound from '../../modules/shared/domain/error/ResourceNotFound'
import ValueNotDefined from '../../modules/shared/domain/error/ValueNotDefined'

export const errorHandler = (app: express.Application) => {
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        switch (true) {
            case err.name === InvalidValueError.name:
            case err.name === ValueNotDefined.name:
                res.status(httpStatus.BAD_REQUEST).send({ error: err.message })
                break
            case err.name === ResourceNotFound.name:
                res.status(httpStatus.NOT_FOUND).send({ error: err.message })
                break
            case err.name === ResourceConflict.name:
                res.status(httpStatus.CONFLICT).send({ error: err.message })
                break
            default:
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
                break
        }
    })
}
