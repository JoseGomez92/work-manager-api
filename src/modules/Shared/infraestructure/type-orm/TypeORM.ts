import { DataSource, EntityTarget, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm'
import Config from '../../../../config/Config'
import InternalError from '../../domain/error/InternalError'
import Environment, { EnviromentType } from '../decorators/Environment.decorator'
import 'reflect-metadata' // Mandatory to use TypeORM

export default class TypeORM {
    @Environment()
    private environment!: EnviromentType
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
            entities: [`${process.cwd()}/${this.environment.isProduction ? 'dist' : 'src'}/**/*.entity.{js,ts}`],
            synchronize: !this.environment.isProduction,
        })
    }

    async init() {
        try {
            await this.dataSource.initialize()
        } catch (err) {
            throw new InternalError('TypeORM cannot be initialised.')
        }
    }

    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
        return this.dataSource.getRepository(entity)
    }

    getQueryBuilder<T extends ObjectLiteral>(entity: EntityTarget<T>, alias: string): SelectQueryBuilder<T> {
        return this.getRepository(entity).createQueryBuilder(alias)
    }
}
