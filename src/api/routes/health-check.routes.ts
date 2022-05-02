import { Request, Response, Router } from 'express'

export const mount = (router: Router) => {
    router.get('/health-check', (_req: Request, res: Response) => {
        res.json({ status: 'OK' })
    })
}
