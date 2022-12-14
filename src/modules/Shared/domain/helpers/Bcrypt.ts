import bcrypt from 'bcrypt'

export default class Bcrypt {
    private static ROUNDS = 10

    generateHash(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, Bcrypt.ROUNDS, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    }

    compareHash(password: string, hash: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }
}
