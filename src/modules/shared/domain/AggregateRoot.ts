export default abstract class AggregateRoot<T> {
    protected abstract guardType(value: T): void

    abstract toPrimitives(): T
}
