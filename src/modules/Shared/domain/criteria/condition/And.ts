import CriteriaOperator from '../operators/CriteriaOperator'
import CriteriaCondition from './CriteriaCondition'

export default class And extends CriteriaCondition {
    constructor(operator: CriteriaOperator) {
        super(operator)
    }
}
