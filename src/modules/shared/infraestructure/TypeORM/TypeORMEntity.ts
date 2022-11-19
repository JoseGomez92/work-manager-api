import AggregateRoot from '../../domain/AggregateRoot'

export default abstract class TypeORMEntity<T, E extends AggregateRoot<T>> {
    abstract toAggregateRoot(): E
}
