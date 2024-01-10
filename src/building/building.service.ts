import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BuildingService {
  constructor(@InjectRepository(Building) private buildingRepository: Repository<Building>) {}

  async create(userID: number, createBuildingDto: CreateBuildingDto) {
    const building = this.buildingRepository.create({
      user: userID,
      buildingName: createBuildingDto.buildingName,
      buildingAddress: createBuildingDto.buildingAddress,
      price: createBuildingDto.price,
      additionalItem: createBuildingDto.additionalItem
    })

    await this.buildingRepository.save(building)

    return building;
  }

  async findAll() {
    const sewa = await this.buildingRepository.find({
      relations:['user']
    })

    return sewa; 
  }

  //mencari buildingId
  async findOneByBuildingId(id: number) {
    return this.buildingRepository.findOneById(id)
  }

  // Mencari buildingId yang di pesan menggunakan userId,
  findOneUserId(inputUserId: number): Promise<Building[]> {
    const promisedUserId = new Promise<Building[]> (
      (resolve, reject) => {   
        this.buildingRepository.find({
          where: {
            user: Equal(inputUserId),
          }
        }).then(resultData => {
          if (resultData != null) {
            let allBuildingDto = [];

            resultData.forEach(data =>{
              let buildingDto = new Building();
            buildingDto.user = data.user;
            buildingDto.buildingID = data.buildingID;
            buildingDto.buildingName = data.buildingName;
            buildingDto.buildingAddress = data.buildingAddress;
            buildingDto.price = data.price;

            allBuildingDto.push(buildingDto);
          })

            
            resolve(allBuildingDto);
          } else {
            reject("Failed to Find Id User")
          }
        })        
      }
    )

    return promisedUserId;
  }


  async findOneByPrice(price : string) {
    //coba2 dev
    //localhost:3000/building/(harga)/price
    return await this.buildingRepository.find({where: {price}})
    
  }

  //mencari Address
  async findOneByAddress(buildingAddress: string) {
    return await this.buildingRepository.find({where: {buildingAddress}})
  }

  async update(id: number, updateBuildingDto: any) {
    const user = await this.buildingRepository.findOneById(id)
    Object.assign(user,updateBuildingDto)
    await this.buildingRepository.save(user)
    return user
  }

  remove(id: number) {
    return this.buildingRepository.delete(id)
  }
}
