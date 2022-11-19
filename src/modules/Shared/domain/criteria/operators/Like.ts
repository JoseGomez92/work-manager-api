import CriteriaOperator from './CriteriaOperator'

export default class Like implements CriteriaOperator {
    constructor(readonly field: string, readonly value: string) {}
}
