import Query from '../../../domain/cqrs/Query'
import QueryBus from '../../../domain/cqrs/QueryBus'
import Response from '../../../domain/cqrs/Response'
import QueryHandlersInformation from './QueryHandlersInformation'

export default class InMemoryQueryBus implements QueryBus {
    constructor(private information: QueryHandlersInformation) {}

    ask<R extends Response>(query: Query): Promise<R> {
        return this.information.search(query).handle(query) as Promise<R>
    }
}
