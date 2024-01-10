import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      phoneNumber: createUserDto.phoneNumber
    })

    await this.userRepository.save(user)

    return user;
  }

  async findAll(): Promise<CreateUserDto[]> {
    const returnPromise = new Promise<CreateUserDto[]> (
      (resolve, reject) => {
        this.userRepository.find().then(resultData => {
          if (resultData != null) {
            let allUserDto = [];

            resultData.forEach(data => {
              let userDto = new CreateUserDto();
              userDto = data
              userDto.email = data.email;
              userDto.name = data.name;
              userDto.password = data.password;
              userDto.phoneNumber = data.phoneNumber;

              allUserDto.push(userDto);
            });

            resolve(allUserDto);
          } else {
            reject("Failed to Fetch All User Data");
          }
        })        
      }
    )

    return returnPromise;
    
  }

  async findOneById(inputId: number): Promise<CreateUserDto> {
    const promisedId = new Promise<CreateUserDto> (
      (resolve, reject) => {   
        this.userRepository.findOne({
          where: {
            userID: Equal(inputId),
          }
        }).then(resultData => {
          if (resultData != null) {
            let idDto = new CreateUserDto();
            idDto.name = resultData.name;
            idDto.email = resultData.email;
            idDto.password = null;
            idDto.phoneNumber = resultData.phoneNumber;

            resolve(idDto);
          } else {
            reject("Failed to Find Id User")
          }
        })        
      }
    )

    return promisedId;
  }

  async findOneByName(inputName: string): Promise<CreateUserDto> {
    const promisedName = new Promise<CreateUserDto> (
      (resolve, reject) => {   
        this.userRepository.findOne({
          where: {
            name: Equal(inputName),
          }
        }).then(resultData => {
          if (resultData != null) {
            let nameDto = new CreateUserDto();
            nameDto.name = resultData.name;
            nameDto.email = resultData.email;
            nameDto.password = null;
            nameDto.phoneNumber = resultData.phoneNumber;

            resolve(nameDto);
          } else {
            reject("Failed to Find Name User")
          }
        })        
      }
    )
    return promisedName;
  }

  async findOneByEmail(inputEmail: string): Promise<CreateUserDto> {
    const promisedEmail = new Promise<CreateUserDto> (
       (resolve,reject) => {this.userRepository.findOne({
       where: {
         email: Equal(inputEmail),
       },
     }).then(resultEmail => {
       if (resultEmail != null) {
         // objek DTO untuk hasil pencarian
         let emailDto = new CreateUserDto();
         emailDto.name = resultEmail.name;
         emailDto.email = resultEmail.email;
         emailDto.password = null; 
         emailDto.phoneNumber = resultEmail.phoneNumber;
     resolve(emailDto);
       } else {
         reject("failed to find Email User")
       }
     })
   
     
   })
   return promisedEmail;
 }

 async findOneByPhoneNumber(inputNumber: string): Promise<CreateUserDto> {
  const promisedNumber = new Promise<CreateUserDto> (
     (resolve,reject) => { this.userRepository.findOne({
     where: {
       phoneNumber: Equal(inputNumber),
     },
   }).then(resultNumber => {
     if (resultNumber != null) {
       // objek DTO untuk hasil pencarian
       let numberDto = new CreateUserDto();
       numberDto.name = resultNumber.name;
       numberDto.email = resultNumber.email;
       numberDto.password = null; 
       numberDto.phoneNumber = resultNumber.phoneNumber;

  resolve(numberDto);
     } else {
       reject("failed to find phone number user")
     }
   })
 
   
 })
 return promisedNumber;
}

async update(inputId: number, updateUserDto :any) {
  const existingUser = await this.userRepository.findOne({where: {
    userID: Equal(inputId),
  }});

  if (!existingUser) {
    throw new Error("User not found");
  }
  Object.assign(existingUser,updateUserDto)
  await this.userRepository.save(existingUser)
  return existingUser

}

async remove(inputId: number): Promise<CreateUserDto> {
  const returnPromise = new Promise<CreateUserDto> (
    (resolve, reject) => {
      this.userRepository.findOne({
        where: {
          userID: Equal(inputId),
        }
      }).then(
        findResultData => {
          if (findResultData != null) {
            this.userRepository.remove(findResultData)
              .then(
                removeResultData => {
                  if (removeResultData != null) {
                    let deletedUserDto = new CreateUserDto();
                    deletedUserDto.email = removeResultData.email;
                    deletedUserDto.name = removeResultData.name;
                    deletedUserDto.password = null;

                    resolve(deletedUserDto);
                  } else {
                    reject("Failed te Delete User Data");
                  }
                }
              )
          } else {
            reject("Failed to Find User Data for Deletion")
          }
        }
      )
    }
  )

  return returnPromise;
}
}
