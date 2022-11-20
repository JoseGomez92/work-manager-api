import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import Criteria from '../../../domain/criteria/Criteria'
import Comparation from '../../../domain/criteria/operators/Comparation'
import In from '../../../domain/criteria/operators/In'
import Like from '../../../domain/criteria/operators/Like'
import { OrderValue } from '../../../domain/criteria/order/CriteriaOrder'
import CriteriaError from '../../../domain/error/CriteriaError'
import TypeORMComparation from './operators/TypeORMComparation'
import TypeORMIn from './operators/TypeORMIn'
import TypeORMLike from './operators/TypeORMLike'

export default class TypeORMCriteriaApplier<T extends ObjectLiteral> {
    constructor(private queryBuilder: SelectQueryBuilder<T>, private criteria: Criteria) {}

    async apply(): Promise<Array<T>> {
        this.applyConditions()
        this.applyPagination()
        this.applySorting()

        return this.queryBuilder.getMany()
    }

    private applyConditions(): void {
        this.criteria.getConditions().forEach((condition, index) => {
            const operator = condition.getOperator()
            switch (operator.constructor.name) {
                case Comparation.name:
                    new TypeORMComparation(condition, this.queryBuilder, index).apply()
                    break
                case In.name:
                    new TypeORMIn(condition, this.queryBuilder, index).apply()
                    break
                case Like.name:
                    new TypeORMLike(condition, this.queryBuilder, index).apply()
                    break
                default:
                    throw new CriteriaError(`Operator <${operator.constructor.name}> not implemented`)
            }
        })
    }

    private applyPagination(): void {
        if (!this.criteria.getPagination()) return

        const { size, offset } = this.criteria.getPagination()!
        this.queryBuilder.take(size)
        this.queryBuilder.skip(offset)
    }

    private applySorting(): void {
        if (!this.criteria.getOrder()) return

        const { field, direction } = this.criteria.getOrder()!
        const order = direction === OrderValue.ASC ? 'ASC' : 'DESC'
        this.queryBuilder.orderBy(`${this.queryBuilder.alias}.${field}`, order)
    }
}
