import fs from 'fs'
import cloneDeep from 'lodash'

export type ConfigType = {
    server: {
        port: number
    }
    security: {
        secretKey: string
        hoursExpiration: number // in hours
    }
    mysql: {
        host: string
        port: number
        username: string
        password: string
        database: string
    }
}

export default class Config {
    private _parameters!: ConfigType

    get(): ConfigType {
        return cloneDeep(this._parameters).value()
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
        if (!process.env.TOKEN_DURATION_HOURS) throw new Error('TOKEN_DURATION_HOURS is not defined')
        if (!process.env.MYSQL_HOST) throw new Error('MYSQL_HOST is not defined')
        if (!process.env.MYSQL_PORT) throw new Error('MYSQL_PORT is not defined')
        if (!process.env.MYSQL_USERNAME) throw new Error('MYSQL_USERNAME is not defined')
        if (!process.env.MYSQL_PASSWORD) throw new Error('MYSQL_PASSWORD is not defined')
        if (!process.env.MYSQL_DATABASE) throw new Error('MYSQL_DATABASE is not defined')
    }

    private loadParameters() {
        this._parameters = {
            server: {
                port: Number(process.env.SERVER_PORT),
            },
            security: {
                secretKey: process.env.SECRET_KEY!,
                hoursExpiration: Number(process.env.TOKEN_DURATION_HOURS),
            },
            mysql: {
                host: process.env.MYSQL_HOST!,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USERNAME!,
                password: process.env.MYSQL_PASSWORD!,
                database: process.env.MYSQL_DATABASE!,
            },
        }
    }
}
