import CriteriaOperator from './CriteriaOperator'

export default class In implements CriteriaOperator {
    constructor(readonly field: string, readonly values: Array<string>) {}
}
