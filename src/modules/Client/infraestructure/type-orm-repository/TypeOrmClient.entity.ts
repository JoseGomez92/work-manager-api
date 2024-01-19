import { Column, Entity, PrimaryColumn } from 'typeorm'
import TypeORMEntity from '../../../Shared/infraestructure/type-orm/TypeORMEntity'
import Client, { ClientType } from '../../domain/Client'

@Entity('clients')
export default class TypeOrmClient extends TypeORMEntity<ClientType, Client> implements ClientType {
    @PrimaryColumn('varchar', { length: 50 })
    id!: string

    @Column('varchar', { length: 80 })
    fullName!: string

    @Column('varchar', { length: 150 })
    address!: string

    @Column('varchar', { length: 10 })
    phoneNumber!: string

    @Column({ type: 'bool', width: 1 })
    hasParkingArea!: boolean

    @Column({ type: 'bool', width: 1 })
    hasElevator!: boolean

    @Column({ type: 'bool', width: 1 })
    hasLightPoint!: boolean

    toAggregateRoot(): Client {
        return Client.create({
            id: this.id,
            fullName: this.fullName,
            address: this.address,
            phoneNumber: this.phoneNumber,
            hasParkingArea: this.hasParkingArea,
            hasElevator: this.hasElevator,
            hasLightPoint: this.hasLightPoint,
        })
    }
}
