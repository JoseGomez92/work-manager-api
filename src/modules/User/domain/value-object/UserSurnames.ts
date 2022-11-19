import StringValueObject from '../../../Shared/domain/primitive-value-object/StringValueObject'

export default class UserSurnames extends StringValueObject {
    constructor(readonly value: string) {
        super(value)
    }
}
