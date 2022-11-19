import Query from '../../../domain/cqrs/Query'
import QueryHandler from '../../../domain/cqrs/QueryHandler'
import Response from '../../../domain/cqrs/Response'

export default class QueryHandlersInformation {
    private handlersMap: Map<Query, QueryHandler<Query, Response>>

    constructor(handlers: Array<QueryHandler<Query, Response>>) {
        this.handlersMap = new Map()
        handlers.forEach((h) => this.handlersMap.set(h.subscribedTo(), h))
    }

    search(query: Query): QueryHandler<Query, Response> {
        const handler = this.handlersMap.get(query.constructor)
        if (!handler) {
            throw new Error(`No Query Handler found for query <${query.constructor.name}>`)
        }

        return handler
    }
}
