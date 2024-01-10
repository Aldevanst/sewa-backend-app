import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';




@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  
  // @Get('test/role')
  // @Roles(Role.Admin)
  // testRole() {
  //   return 'berhasil'
  // }

  // create user
  @Post("post")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("get")
  async findAll() {
    const allUserDto = await this.userService.findAll();
    return allUserDto;
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    const userId = await this.userService.findOneById(+id);
    return userId;
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    const userEmail = await this.userService.findOneByEmail(email);
    return userEmail;
  }

  @Get('number/:number')
  async findOneByPhoneNumber(@Param('number') phoneNumber: string) {
    const userNumber = await this.userService.findOneByPhoneNumber(phoneNumber)
    return userNumber;
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    const userName = await this.userService.findOneByName(name)
    return userName;
  }

  @Patch(':id/update')
  async update(@Param('id') id: string, 
   @Body() updateUserDto: UpdateUserDto) {
    const updatedUserDto = await this.userService.update(+id, updateUserDto);
    return updatedUserDto;
  }

  @Delete(':id/remove')
  async remove(@Param('id') id: string) {
    const removedUserDto = this.userService.remove(+id);
    return removedUserDto;
  }
}
