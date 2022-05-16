import { NextFunction, Request, Response, Router } from 'express'
import container from '../../container'
import { routeGuard } from '../middleware/route-guard'

const path = '/user'

export const mount = (router: Router) => {
    // TODO: Protect this route
    router.put(path, (req: Request, res: Response, next: NextFunction) => {
        return container.get('User.SaveUserPutController').handle(req, res, next)
    })

    router.post(`${path}/:id`, routeGuard, (req: Request, res: Response, next: NextFunction) => {
        return container.get('User.UpdateUserPostController').handle(req, res, next)
    })
}
