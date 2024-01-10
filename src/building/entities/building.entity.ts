import { Rental } from "src/rental/entities/rental.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Building {
    @PrimaryGeneratedColumn()
    buildingID: number

    @OneToMany(() => Rental, (rental) => rental.buildingID)
    rentals: Rental[]

    @ManyToOne(() => User, (user) => user.buildings)
    @JoinColumn({ name: 'userID' })
    user: number

    @Column()
    buildingName: string

    @Column()
    price: string

    @Column()
    buildingAddress: string
    
    @Column()
    additionalItem: string
}
