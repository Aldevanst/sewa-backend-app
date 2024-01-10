import { IsNotEmpty, IsString } from "class-validator";

export class CreateBuildingDto {
    @IsNotEmpty({message: "Building name cannot be empty"})
    @IsString({message: "Must be string type"})
    buildingName: string

    @IsNotEmpty({message: "Building address cannot be empty"})
    @IsString({message: "Must be string type"})
    buildingAddress: string

    @IsNotEmpty({message: "Building price cannot be empty"})
    @IsString({message: "Must be string type"})
    price: string

    @IsString({message: "Must be string type"})
    additionalItem: string

}
