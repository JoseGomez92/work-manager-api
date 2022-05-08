export enum OrderValue {
    ASC = 'asc',
    DESC = 'desc',
}

export default class CriteriaOrder {
    constructor(readonly field: string, readonly direction: OrderValue) {}
}
