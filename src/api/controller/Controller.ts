import { NextFunction, Request, Response } from 'express'

export default abstract class Controller {
    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            await this.run(request, response)
        } catch (error) {
            next(error)
        }
    }

    protected abstract run(request: Request, response: Response): Promise<Response>
}
