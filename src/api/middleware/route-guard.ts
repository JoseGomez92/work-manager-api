import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import container from '../../container'

enum RouteGuardErrorMessages {
    TOKEN_IS_REQUIRED = 'Token is required',
    TOKEN_IS_NOT_VALID = 'Token is not valid',
}

export const routeGuard = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization) return formUnauthorized(res, RouteGuardErrorMessages.TOKEN_IS_REQUIRED)

    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer') return formUnauthorized(res, RouteGuardErrorMessages.TOKEN_IS_REQUIRED)
    if (!token) return formUnauthorized(res, RouteGuardErrorMessages.TOKEN_IS_REQUIRED)

    const jwt = container.get('Shared.Helpers.Jwt')

    if (jwt.isValid(token)) {
        return next()
    } else {
        formUnauthorized(res, RouteGuardErrorMessages.TOKEN_IS_NOT_VALID)
    }
}

const formUnauthorized = (res: Response, message: RouteGuardErrorMessages) => {
    return res.status(httpStatus.UNAUTHORIZED).json({ error: message })
}
