export default class ValueNotDefined extends Error {
    constructor(value: string) {
        super(`The value or property <${value}> is not defined.`)
        this.name = ValueNotDefined.name
    }
}
