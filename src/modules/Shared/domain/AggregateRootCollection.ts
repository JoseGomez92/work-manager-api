import Optional from './helpers/Optional'

export default abstract class AggregateRootCollection<T> {
    constructor(private readonly values: Array<T>) {}

    get(): Array<T> {
        return this.values
    }

    get first(): Optional<T> {
        return new Optional(this.values[0])
    }

    isEmpty(): boolean {
        return this.values.length === 0
    }
}
