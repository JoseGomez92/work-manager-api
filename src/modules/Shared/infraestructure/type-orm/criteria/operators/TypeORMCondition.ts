import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import CriteriaCondition from '../../../../domain/criteria/condition/CriteriaCondition'
import Or from '../../../../domain/criteria/condition/Or'

export default abstract class TypeORMCondition<T extends ObjectLiteral> {
    protected readonly condition: CriteriaCondition
    protected readonly queryBuilder: SelectQueryBuilder<T>
    protected readonly conditionsApplied: number
    protected readonly queryAlias: string

    constructor(condition: CriteriaCondition, queryBuilder: SelectQueryBuilder<T>, conditionsApplied: number) {
        this.condition = condition
        this.queryBuilder = queryBuilder
        this.conditionsApplied = conditionsApplied
        this.queryAlias = queryBuilder.alias
    }

    abstract apply(): void

    protected abstract getSqlParticle(): string

    protected setWhere(sqlParticle: string) {
        if (this.conditionsApplied === 0) {
            this.queryBuilder.where(sqlParticle)
        } else {
            this.condition.constructor.name === Or.name ? this.queryBuilder.orWhere(sqlParticle) : this.queryBuilder.andWhere(sqlParticle)
        }
    }
}
