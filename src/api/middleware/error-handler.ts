import express, { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import AuthenticationError from '../../modules/Shared/domain/error/AuthenticationError'
import CriteriaError from '../../modules/Shared/domain/error/CriteriaError'
import InvalidValueError from '../../modules/Shared/domain/error/InvalidValueError'
import ResourceAlreadyExists from '../../modules/Shared/domain/error/ResourceAlreadyExists'
import ResourceNotFound from '../../modules/Shared/domain/error/ResourceNotFound'
import ValueNotDefined from '../../modules/Shared/domain/error/ValueNotDefined'

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
            case err.name === ResourceAlreadyExists.name:
                res.status(httpStatus.CONFLICT).send({ error: err.message })
                break
            case err.name === CriteriaError.name:
                res.status(httpStatus.BAD_REQUEST).send({ error: err.message })
                break
            case err.name === AuthenticationError.name:
                res.status(httpStatus.UNAUTHORIZED).send({ error: err.message })
                break
            default:
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error has ocurred' })
                break
        }
    })
}
