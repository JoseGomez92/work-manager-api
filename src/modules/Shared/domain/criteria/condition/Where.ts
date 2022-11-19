import CriteriaOperator from '../operators/CriteriaOperator'
import CriteriaCondition from './CriteriaCondition'

export default class Where extends CriteriaCondition {
    constructor(operator: CriteriaOperator) {
        super(operator)
    }
}
