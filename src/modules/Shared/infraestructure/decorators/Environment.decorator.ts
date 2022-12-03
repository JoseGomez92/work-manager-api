export type EnviromentType = {
    environment: 'development' | 'production'
    isProduction: boolean
}

export default function Environment() {
    const environment = process.env.NODE_ENV

    return function (target: {} | any, name: PropertyKey) {
        const descriptor = {
            get(this: any) {
                return {
                    environment,
                    isProduction: environment === 'production',
                } as EnviromentType
            },
            enumerable: true,
            configurable: true,
        }
        Object.defineProperty(target, name, descriptor)
    }
}
