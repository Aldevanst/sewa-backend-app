import { Building } from "src/building/entities/building.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    rentalID: number

    @ManyToOne(() => User, (user) => user.rentals)
    @JoinColumn({ name: 'userID' })
    userID: number

    @ManyToOne(() => Building, (building) => building.rentals)
    @JoinColumn({ name: 'buildingID' })
    buildingID: number

    @Column()
    orderDate: string
    
    @Column()
    eventDate: string
}
