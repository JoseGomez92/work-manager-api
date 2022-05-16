import { Request, Response } from 'express'
import httpStatus from 'http-status'
import container from '../../../container'
import Criteria from '../../../modules/shared/domain/criteria/Criteria'
import Comparation, { ComparatorValue } from '../../../modules/shared/domain/criteria/operators/Comparation'
import AuthenticationError from '../../../modules/shared/domain/error/AuthenticationError'
import InvalidArgumentError from '../../../modules/shared/domain/error/InvalidArgumentError'
import ResourceNotFound from '../../../modules/shared/domain/error/ResourceNotFound'
import Bcrypt from '../../../modules/shared/domain/helpers/Bcrypt'
import JWT from '../../../modules/shared/domain/helpers/JWT'
import FindUser from '../../../modules/user/application/FindUser'
import User from '../../../modules/user/domain/User'
import Controller from '../Controller'

export default class AuthenticatePostController extends Controller {
    private finder: FindUser
    private bcrypt: Bcrypt
    private jwt: JWT

    constructor() {
        super()
        this.finder = container.get('User.Find')
        this.bcrypt = container.get('Shared.Helpers.Bcrypt')
        this.jwt = container.get('Shared.Helpers.Jwt')
    }

    async run(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = this.extractAuthenticationParams(request)
            const user = await this.findUserByEmail(email)
            const isPasswordValid = await this.comparePassword(password, user)
            if (!isPasswordValid) throw new AuthenticationError()

            return response.status(httpStatus.OK).json({ token: this.generateToken(user) })
        } catch (error: any) {
            throw error.name === ResourceNotFound.name ? new AuthenticationError() : error
        }
    }

    private extractAuthenticationParams(request: Request): { email: string; password: string } {
        const { email, password } = request.body
        if (!email) throw new InvalidArgumentError('Email is required')
        if (!password) throw new InvalidArgumentError('Password is required')

        return { email, password }
    }

    private findUserByEmail(email: string): Promise<User> {
        return this.finder.run(new Criteria().where(new Comparation('email', ComparatorValue.EQUAL, email)))
    }

    private comparePassword(password: string, user: User): Promise<boolean> {
        return this.bcrypt.compareHash(password, user.password)
    }

    private generateToken(user: User): string {
        return this.jwt.generate({ userId: user.id })
    }
}
