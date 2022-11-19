import CriteriaOperator from './CriteriaOperator'

export enum ComparatorValue {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL = '<=',
    GREATER_THAN = '>',
    GREATHER_THAN_OR_EQUAL = '>=',
}

export default class Comparation implements CriteriaOperator {
    constructor(readonly field: string, readonly comparator: ComparatorValue, readonly value: string) {}
}
