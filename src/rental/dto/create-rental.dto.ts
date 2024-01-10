import { IsNotEmpty, IsString } from "class-validator";

export class CreateRentalDto {
    
    @IsNotEmpty({message: "order date cannot be empty"})
    @IsString()
    orderDate: string
    
    @IsNotEmpty({message: "Event date cannot be empty"})
    @IsString()
    eventDate: string
}
