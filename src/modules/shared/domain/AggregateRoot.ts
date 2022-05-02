export default abstract class AggregateRoot<T> {
    abstract toPrimitives(): T
}
