import StringValueObject from '../../../shared/domain/primitive-value-object/StringValueObject'

export default class UserPhone extends StringValueObject {
    constructor(readonly value: string) {
        super(value)
    }
}
