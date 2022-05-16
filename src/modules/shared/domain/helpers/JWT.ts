import jwt from 'jsonwebtoken'
import Config from '../../../../config/Config'

export type JWTPayload = {
    userId: string
}

export default class JWT {
    private readonly ALGORITHM = 'HS256'
    private readonly SECRET_KEY: string
    private readonly EXPIRATION_TIME_SECONDS: number

    constructor(private config: Config) {
        this.SECRET_KEY = config.get().security.secretKey
        this.EXPIRATION_TIME_SECONDS = config.get().security.expirationTime * 3600
    }

    generate(payload: JWTPayload): string {
        return jwt.sign(payload, this.SECRET_KEY, { algorithm: this.ALGORITHM, expiresIn: this.EXPIRATION_TIME_SECONDS })
    }

    decode(token: string): JWTPayload {
        return jwt.decode(token) as JWTPayload
    }

    isValid(token: string): boolean {
        try {
            jwt.verify(token, this.SECRET_KEY)
            return true
        } catch (error) {
            return false
        }
    }
}
