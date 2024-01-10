import { IsEmail } from "class-validator";
import { Building } from "src/building/entities/building.entity";
import { Role } from "src/enum/role.enum";
import { Rental } from "src/rental/entities/rental.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userID: number;

    @OneToMany(() => Building, (building) => building.user)
    buildings: Building[]

    @OneToMany(() => Rental, (rental) => rental.userID)
    rentals: Building[]

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({type: 'enum',enum: Role,default: Role.User})
    role: Role
}
