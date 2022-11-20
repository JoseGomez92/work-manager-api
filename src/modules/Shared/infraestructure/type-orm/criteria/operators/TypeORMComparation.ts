import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import CriteriaCondition from '../../../../domain/criteria/condition/CriteriaCondition'
import Comparation from '../../../../domain/criteria/operators/Comparation'
import TypeORMCondition from './TypeORMCondition'

export default class TypeORMComparation<T extends ObjectLiteral> extends TypeORMCondition<T> {
    constructor(condition: CriteriaCondition, queryBuilder: SelectQueryBuilder<T>, conditionsApplied: number) {
        super(condition, queryBuilder, conditionsApplied)
    }

    apply(): void {
        this.setWhere(this.getSqlParticle())
    }

    protected getSqlParticle() {
        const { field, comparator, value } = this.condition.getOperator() as Comparation

        return `${this.queryAlias}.${field} ${comparator} '${value}'`
    }
}
