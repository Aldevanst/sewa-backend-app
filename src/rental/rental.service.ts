import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Equal,Repository } from 'typeorm';

@Injectable()
export class RentalService {
  constructor(@InjectRepository(Rental) private rentalRepository: Repository<Rental>) {}

  async create(userID: number, buildingID: number, createRentalDto: CreateRentalDto) {
    console.log(createRentalDto)
    const rental = this.rentalRepository.create({
      userID,
      buildingID,
      orderDate: createRentalDto.orderDate,
      eventDate: createRentalDto.eventDate
    })

    await this.rentalRepository.save(rental)

    return rental;
  }

  async findAll(){
    const rental = await this.rentalRepository.find(
      {
      relations:['userID','buildingID']
    }
    )
    return rental
  }

  findOneRentalId(rentalId: number) {
    return this.rentalRepository.findOneById(rentalId);
  }

  //mencari reservasi  menggunakan buildingId
  findOneBuildingId(inputBuildingId: number): Promise<Rental[]> {
    const promisedBuildingId = new Promise<Rental[]> (
      (resolve, reject) => {   
        this.rentalRepository.find({
          where: {
            buildingID: Equal(inputBuildingId),
          }
        }).then(resultData => {
          if (resultData != null) {
            let allRentalDto = [];

            resultData.forEach(data =>{
              let rentalDto = new Rental();
              rentalDto.rentalID = data.rentalID;
              rentalDto.buildingID = data.buildingID;
              rentalDto.userID = data.userID;
              rentalDto.orderDate = data.orderDate;
              rentalDto.eventDate = data.eventDate;

            allRentalDto.push(rentalDto);
          })

            
            resolve(allRentalDto);
          } else {
            reject("Failed to Find Rental Id User")
          }
        })        
      }
    )

    return promisedBuildingId;
  }

  //mencari reservasi menggunakan userId
  findOneUserId(inputUserId: number): Promise<Rental[]> {
    const promisedUserId = new Promise<Rental[]> (
      (resolve, reject) => {   
        this.rentalRepository.find({
          where: {
            userID: Equal(inputUserId),
          }
        }).then(resultData => {
          if (resultData != null) {
            let allRentalDto = [];

            resultData.forEach(data =>{
              let rentalDto = new Rental();
              rentalDto.rentalID = data.rentalID;
              rentalDto.buildingID = data.buildingID;
              rentalDto.userID = data.userID;
              rentalDto.orderDate = data.orderDate;
              rentalDto.eventDate = data.eventDate;

            allRentalDto.push(rentalDto);
          })

            
            resolve(allRentalDto);
          } else {
            reject("Failed to Find Rental Id User")
          }
        })        
      }
    )

    return promisedUserId;
  }

  async findOneByOrderDate(orderDate: string) {
    return await this.rentalRepository.find({where: {orderDate}})
  }

  async findOneByEventDate(eventDate: string) {
    return await this.rentalRepository.find({where: {eventDate}})
  }

  async update(id: number, updateBuildingDto: any) {
    const user = await this.rentalRepository.findOneById(id)
    Object.assign(user,updateBuildingDto)
    await this.rentalRepository.save(user)
    return user
  }

  remove(id: number) {
    return this.rentalRepository.delete(id);
  }
}
