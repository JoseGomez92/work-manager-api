import { NextFunction, Request, Response, Router } from 'express'
import container from '../../container'

const path = '/user'

export const mount = (router: Router) => {
    router.put(path, (req: Request, res: Response, next: NextFunction) => {
        return container.get('User.SaveUserPutController').handle(req, res, next)
    })

    router.post(`${path}/:id`, (req: Request, res: Response, next: NextFunction) => {
        return container.get('User.UpdateUserPostController').handle(req, res, next)
    })
}
