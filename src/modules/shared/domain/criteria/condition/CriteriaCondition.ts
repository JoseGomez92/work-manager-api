import CriteriaOperator from '../operators/CriteriaOperator'

export default abstract class CriteriaCondition {
    constructor(protected readonly operator: CriteriaOperator) {}

    getOperator(): CriteriaOperator {
        return this.operator
    }
}
