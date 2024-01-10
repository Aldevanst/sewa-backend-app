import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";
import {UserService} from "../user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    async validate(email: any, args: ValidationArguments) {
    const user = await this.userRepository.findOne({where:{ email }}).then((user) => {
            return !user; // Return false if email already exists
        }); 
        return user 

    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}