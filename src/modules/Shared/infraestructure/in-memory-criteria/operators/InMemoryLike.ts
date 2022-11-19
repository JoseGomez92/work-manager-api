import AggregateRoot from '../../../domain/AggregateRoot'
import Like from '../../../domain/criteria/operators/Like'

export default class InMemoryLike<Z, T extends AggregateRoot<Z>> {
    constructor(private readonly operator: Like, private aggregates: Array<T>) {}

    apply(): Array<T> {
        let { field, value } = this.operator
        value = value.toLowerCase()

        return this.aggregates.filter((aggregate: any) => aggregate[field].toLowerCase().includes(value))
    }
}
