import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import CriteriaCondition from '../../../../domain/criteria/condition/CriteriaCondition'
import In from '../../../../domain/criteria/operators/In'
import TypeORMCondition from './TypeORMCondition'

export default class TypeORMIn<T extends ObjectLiteral> extends TypeORMCondition<T> {
    constructor(condition: CriteriaCondition, queryBuilder: SelectQueryBuilder<T>, conditionsApplied: number) {
        super(condition, queryBuilder, conditionsApplied)
    }

    apply(): void {
        this.setWhere(this.getSqlParticle())
    }

    protected getSqlParticle() {
        const { field, values } = this.condition.getOperator() as In
        const stringedValues = values.map((value) => `'${value}'`)

        return `${this.queryAlias}.${field} IN (${stringedValues.join(',')})`
    }
}
