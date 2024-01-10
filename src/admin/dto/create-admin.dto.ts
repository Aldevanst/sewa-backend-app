import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateAdminDto {
    @IsNotEmpty({message: "Name cannot be empty"})
    @IsString({message: "Must Be string type"})
    adminName: string

    @IsNotEmpty({message: "Email cannot be empty"})
    @IsString({message: "Must Be string type"})
    @IsEmail()
    email: string

    @IsNotEmpty({message: "Password cannot be empty"})
    @IsString({message: "Must Be string type"})
    password: string

    @IsNotEmpty({message: "Phone number cannot be empty"})
    @IsString({message: "Must Be string type"})
    phoneNumber: string
}

