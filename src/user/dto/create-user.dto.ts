import { IsEmail, IsNotEmpty, IsString, ValidatorConstraint, ValidatorConstraintInterface, validate } from "class-validator"
import { IsEmailAlreadyExist } from "./validation";

export class CreateUserDto { 
    
    @IsNotEmpty({message: "Name cannot be empty"})
    @IsString({message: "Must Be string type"})
    name: string

    @IsNotEmpty({message: "Email cannot be empty"})
    @IsString({message: "Must Be string type"})
    @IsEmail({},{message: "Must be Valid Email..!!"})
    email: string

    @IsNotEmpty({message: "Password cannot be empty"})
    @IsString({message: "Must Be string type"})
    password: string

    @IsNotEmpty({message: "Phone number cannot be empty"})
    @IsString({message: "Must Be string type"})
    phoneNumber: string
}
