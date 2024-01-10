import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Equal, Repository } from 'typeorm';


@Injectable()
export class AdminService {

constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepository.create({
      adminName: createAdminDto.adminName,
      email: createAdminDto.email,
      password: createAdminDto.password,
      phoneNumber: createAdminDto.phoneNumber
    })

    await this.adminRepository.save(admin)

    return admin;
  }

  async findAll(): Promise<Admin[]> {
    const newPromise = new Promise<Admin[]> (
      (resolve, reject) => {
        this.adminRepository.find().then(resultData => {
          if (resultData != null) {
            let allAdminDto = [];

            resultData.forEach(data => {
              let adminDto = new Admin();
              adminDto = data
              adminDto.email = data.email;
              adminDto.adminName = data.adminName;
              adminDto.password = data.password;
              adminDto.phoneNumber = data.phoneNumber;

              allAdminDto.push(adminDto);
            });

            resolve(allAdminDto);
          } else {
            reject("Failed to Fetch All Admin Data");
          }
        })        
      }
    )

    return newPromise;
    
  }

  async findOneById(inputId: number): Promise<Admin> {
    const promisedId = new Promise<Admin> (
      (resolve, reject) => {   
        this.adminRepository.findOne({
          where: {
            adminId: Equal(inputId),
          }
        }).then(resultData => {
          if (resultData != null) {
            let idDto = new Admin();
            idDto.adminName = resultData.adminName;
            idDto.email = resultData.email;
            idDto.password = null;
            idDto.phoneNumber = resultData.phoneNumber;

            resolve(idDto);
          } else {
            reject("Failed to Find Id Admin")
          }
        })        
      }
    )

    return promisedId;
  }

  async findOneByName(inputName: string): Promise<Admin> {
    const promisedName = new Promise<Admin> (
      (resolve, reject) => {   
        this.adminRepository.findOne({
          where: {
            adminName: Equal(inputName),
          }
        }).then(resultData => {
          if (resultData != null) {
            let idDto = new Admin();
            idDto.adminName = resultData.adminName;
            idDto.email = resultData.email;
            idDto.password = null;
            idDto.phoneNumber = resultData.phoneNumber;

            resolve(idDto);
          } else {
            reject("Failed to Find Name Admin")
          }
        })        
      }
    )

    return promisedName;
  }

  
  async update(id: number, updateAdminDto: any) {
    const user = await this.adminRepository.findOneById(id)
    Object.assign(user,updateAdminDto)
    await this.adminRepository.save(user)
    return user
  }

  remove(id: number) {
    return this.adminRepository.delete(id)
  }
}
