import fs from 'fs'
import _ from 'lodash'

export type ConfigType = {
    server: {
        port: number
    }
}

export default class Config {
    private _parameters!: ConfigType

    get(): ConfigType {
        return _.cloneDeep(this._parameters)
    }

    constructor() {
        this.loadEnviromentFile()
        this.loadParameters()
        this.guardServerConfig()
    }

    private loadEnviromentFile() {
        const path = `${process.cwd()}/etc/.env`
        if (!fs.existsSync(path)) throw new Error(`Env file not found in etc folder <${path}>`)
        require('dotenv').config({ path })
    }

    private loadParameters() {
        this._parameters = {
            server: {
                port: Number(process.env.SERVER_PORT),
            },
        }
    }

    private guardServerConfig() {
        if (!process.env.SERVER_PORT) throw new Error('SERVER_PORT is not defined')
    }
}
