import AggregateRoot from '../../domain/AggregateRoot'
import Criteria from '../../domain/criteria/Criteria'
import Comparation from '../../domain/criteria/operators/Comparation'
import In from '../../domain/criteria/operators/In'
import Like from '../../domain/criteria/operators/Like'
import { OrderValue } from '../../domain/criteria/order/CriteriaOrder'
import CriteriaError from '../../domain/error/CriteriaError'
import InMemoryComparation from './operators/InMemoryComparation'
import InMemoryIn from './operators/InMemoryIn'
import InMemoryLike from './operators/InMemoryLike'

export default class InMemoryCriteriaApplier<Z, T extends AggregateRoot<Z>> {
    constructor(private aggregates: Array<T>, private criteria: Criteria) {}

    apply(): Array<T> {
        this.applyConditions()
        this.applyPagination()
        this.applySorting()

        return this.aggregates
    }

    private applyConditions(): void {
        if (this.criteria.getConditions().length === 0) return

        this.criteria.getConditions().forEach((condition) => {
            const operator = condition.getOperator()
            switch (operator.constructor.name) {
                case Comparation.name:
                    this.aggregates = new InMemoryComparation(operator as Comparation, this.aggregates).apply()
                    break
                case In.name:
                    this.aggregates = new InMemoryIn(operator as In, this.aggregates).apply()
                    break
                case Like.name:
                    this.aggregates = new InMemoryLike(operator as Like, this.aggregates).apply()
                    break
                default:
                    throw new CriteriaError(`Operator <${operator.constructor.name}> not implemented`)
            }
        })
    }

    private applyPagination(): void {
        if (!this.criteria.getPagination()) return
        const { size, offset } = this.criteria.getPagination()!
        this.aggregates = this.aggregates.slice(offset, offset + size)
    }

    private applySorting(): void {
        if (!this.criteria.getOrder()) return

        const { field, direction } = this.criteria.getOrder()!
        this.aggregates = this.aggregates.sort((a: any, b: any) => {
            return a[field] > b[field] ? 1 : -1
        })

        if (direction === OrderValue.DESC) this.aggregates.reverse()
    }
}
