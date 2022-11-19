import { Column, Entity, PrimaryColumn } from 'typeorm'
import TypeORMEntity from '../../../shared/infraestructure/TypeORM/TypeORMEntity'
import User, { UserType } from '../../domain/User'

@Entity('users')
export default class TypeOrmUser extends TypeORMEntity<UserType, User> implements UserType {
    //TODO: Check the perfomance with binary type
    @PrimaryColumn('varchar', { length: 50 })
    id!: string

    @Column('varchar', { length: 50 })
    name!: string

    @Column('varchar', { length: 255 })
    surnames!: string

    @Column('varchar', { length: 150 })
    email!: string

    @Column('varchar', { length: 15 })
    phone!: string

    @Column('varchar', { length: 255 })
    address!: string

    @Column('varchar', { length: 100 })
    password!: string

    toAggregateRoot(): User {
        return User.create({
            id: this.id,
            name: this.name,
            surnames: this.surnames,
            email: this.email,
            phone: this.phone,
            address: this.address,
            password: this.password,
        })
    }
}
