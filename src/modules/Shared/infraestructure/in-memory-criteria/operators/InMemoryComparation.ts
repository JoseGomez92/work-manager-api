import AggregateRoot from '../../../domain/AggregateRoot'
import Comparation, { ComparatorValue } from '../../../domain/criteria/operators/Comparation'
import CriteriaError from '../../../domain/error/CriteriaError'

export default class InMemoryComparation<Z, T extends AggregateRoot<Z>> {
    constructor(readonly operator: Comparation, readonly aggregates: Array<T>) {}

    apply(): Array<T> {
        let { field, comparator, value } = this.operator
        value = value.toLowerCase()

        switch (comparator) {
            case ComparatorValue.EQUAL:
                return this.equal(field, value)
            case ComparatorValue.NOT_EQUAL:
                return this.notEqual(field, value)
            case ComparatorValue.LESS_THAN:
                return this.lessThan(field, value)
            case ComparatorValue.LESS_THAN_OR_EQUAL:
                return this.lessThanOrEqual(field, value)
            case ComparatorValue.GREATER_THAN:
                return this.greaterThan(field, value)
            case ComparatorValue.GREATHER_THAN_OR_EQUAL:
                return this.greaterThanOrEqual(field, value)
            default:
                throw new CriteriaError(`Comparation operator <${comparator}> not implemented`)
        }
    }

    private equal(field: string, value: string): Array<T> {
        return this.aggregates.filter((aggregate: any) => aggregate[field].toLowerCase() === value)
    }

    private notEqual(field: string, value: string): Array<T> {
        return this.aggregates.filter((aggregate: any) => aggregate[field].toLowerCase() !== value)
    }

    private lessThan(field: string, value: string): Array<T> {
        return this.aggregates.filter((aggregate: any) => aggregate[field] < value)
    }

    private lessThanOrEqual(field: string, value: string): Array<T> {
        return this.aggregates.filter((aggregate: any) => aggregate[field] <= value)
    }

    private greaterThan(field: string, value: string): Array<T> {
        return this.aggregates.filter((aggregate: any) => aggregate[field] > value)
    }

    private greaterThanOrEqual(field: string, value: string): Array<T> {
        return this.aggregates.filter((aggregate: any) => aggregate[field] >= value)
    }
}
