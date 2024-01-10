import { Role } from "src/enum/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    adminId: number

    @Column()
    adminName : string

    @Column()
    email: string

    @Column()
    password: string
    
    @Column()
    phoneNumber: string
    
    @Column({type: 'enum',enum: Role,default: Role.Admin})
    role: Role[]
}
