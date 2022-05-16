import { NextFunction, Request, Response, Router } from 'express'
import AuthenticatePostController from '../controller/auth/AuthenticatePostController'

const path = '/auth'

export const mount = (router: Router) => {
    const controller = new AuthenticatePostController()

    router.post(path, (req: Request, res: Response, next: NextFunction) => {
        return controller.handle(req, res, next)
    })
}
