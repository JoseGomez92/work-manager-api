import _ from 'lodash'
import CriteriaError from '../error/CriteriaError'
import And from './condition/And'
import CriteriaCondition from './condition/CriteriaCondition'
import Or from './condition/Or'
import Where from './condition/Where'
import CriteriaOperator from './operators/CriteriaOperator'
import CriteriaOrder, { OrderValue } from './order/CriteriaOrder'
import CriteriaPagination from './pagination/CriteriaPagination'

export type CriteriaType = {
    conditions?: Array<CriteriaCondition>
    pagination?: CriteriaPagination
    order?: CriteriaOrder
}

export default class Criteria {
    private _conditions: Array<CriteriaCondition>
    private _pagination?: CriteriaPagination
    private _order?: CriteriaOrder

    constructor() {
        this._conditions = []
    }

    getConditions(): Array<CriteriaCondition> {
        return _.cloneDeep(this._conditions)
    }

    getPagination(): CriteriaPagination | undefined {
        return this._pagination ? _.cloneDeep(this._pagination) : undefined
    }

    getOrder(): CriteriaOrder | undefined {
        return this._order ? _.cloneDeep(this._order) : undefined
    }

    where(condition: CriteriaOperator): Criteria {
        this._conditions.push(new Where(condition))

        return this
    }

    and(condition: CriteriaOperator): Criteria {
        if (!this._conditions.length) throw new CriteriaError('Where condition is required before And')
        this._conditions.push(new And(condition))

        return this
    }

    or(condition: Or): Criteria {
        if (!this._conditions.length) throw new CriteriaError('Where condition is required before Or')
        this._conditions.push(new Or(condition))

        return this
    }

    pagination(args: { size: number; offset: number }): Criteria {
        this._pagination = new CriteriaPagination(args.size, args.offset)

        return this
    }

    order(args: { field: string; direction: OrderValue }): Criteria {
        this._order = new CriteriaOrder(args.field, args.direction)

        return this
    }
}
