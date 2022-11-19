import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm'
import Config from '../../../../config/Config'
import InternalError from '../../domain/error/InternalError'
import 'reflect-metadata' // Mandatory to use TypeORM

export default class TypeORM {
    private dataSource: DataSource

    constructor(config: Config) {
        const { mysql } = config.get()
        this.dataSource = new DataSource({
            type: 'mysql',
            host: mysql.host,
            port: mysql.port,
            username: mysql.username,
            password: mysql.password,
            database: mysql.database,
            entities: [`${process.cwd()}/**/*.entity.ts`],
            synchronize: process.env.NODE_ENV === 'development',
        })
    }

    async init() {
        try {
            await this.dataSource.initialize()
        } catch (err) {
            throw new InternalError('TypeORM cannot be initialised.')
        }
    }

    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>) {
        return this.dataSource.getRepository(entity)
    }
}
