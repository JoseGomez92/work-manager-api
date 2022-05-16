import fs from 'fs'
import _ from 'lodash'

export type ConfigType = {
    server: {
        port: number
    }
    security: {
        secretKey: string
        expirationTime: number // in hours
    }
}

export default class Config {
    private _parameters!: ConfigType

    get(): ConfigType {
        return _.cloneDeep(this._parameters)
    }

    constructor() {
        this.loadEnviromentFile()
        this.guardEnviromentVars()
        this.loadParameters()
    }

    private loadEnviromentFile() {
        const path = `${process.cwd()}/etc/.env`
        if (!fs.existsSync(path)) throw new Error(`Env file not found in etc folder <${path}>`)
        require('dotenv').config({ path })
    }

    private guardEnviromentVars() {
        if (!process.env.SERVER_PORT) throw new Error('SERVER_PORT is not defined')
        if (!process.env.SECRET_KEY) throw new Error('SECRET_KEY is not defined')
        if (!process.env.TOKEN_EXPIRATION_TIME) throw new Error('TOKEN_EXPIRATION_TIME is not defined')
    }

    private loadParameters() {
        this._parameters = {
            server: {
                port: Number(process.env.SERVER_PORT),
            },
            security: {
                secretKey: process.env.SECRET_KEY!,
                expirationTime: Number(process.env.TOKEN_EXPIRATION_TIME),
            },
        }
    }
}
