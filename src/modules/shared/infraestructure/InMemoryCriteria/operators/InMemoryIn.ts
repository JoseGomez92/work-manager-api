import AggregateRoot from '../../../domain/AggregateRoot'
import In from '../../../domain/criteria/operators/In'

export default class InMemoryIn<Z, T extends AggregateRoot<Z>> {
    constructor(private readonly operator: In, private aggregates: Array<T>) {}

    apply(): Array<T> {
        let { field, values } = this.operator
        values = values.map((value) => value.toLowerCase())

        return this.aggregates.filter((aggregate: any) => values.includes(aggregate[field].toLowerCase()))
    }
}
