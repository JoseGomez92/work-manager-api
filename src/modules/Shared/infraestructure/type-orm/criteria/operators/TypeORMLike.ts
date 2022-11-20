import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import CriteriaCondition from '../../../../domain/criteria/condition/CriteriaCondition'
import Like from '../../../../domain/criteria/operators/Like'
import TypeORMCondition from './TypeORMCondition'

export default class TypeORMLike<T extends ObjectLiteral> extends TypeORMCondition<T> {
    constructor(condition: CriteriaCondition, queryBuilder: SelectQueryBuilder<T>, conditionsApplied: number) {
        super(condition, queryBuilder, conditionsApplied)
    }

    apply(): void {
        this.setWhere(this.getSqlParticle())
    }

    protected getSqlParticle() {
        const { field, value } = this.condition.getOperator() as Like

        return `${this.queryAlias}.${field} LIKE '%${value}%'`
    }
}
