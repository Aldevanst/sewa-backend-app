import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
// import { AuthGuard } from 'src/Auth/auth.guard';
// import { Roles } from 'src/Author/roles.decorator';
// import { Role } from 'src/enum/role.enum';

// @UseGuards(AuthGuard)
// @Roles(Role.Admin)
@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}


  @Post(':userID/create/:buildingID')
  create(
    @Param('userID') userID: string,
    @Param('buildingID') buildingID: string,
    @Body() createRentalDto: CreateRentalDto) {
      console.log(userID)
      console.log(buildingID)
    return this.rentalService.create(parseInt(userID), parseInt(buildingID), createRentalDto);
  }

  @Get("get")
  findAll() {
    return this.rentalService.findAll();
  }

  @Get(':id')
  findOneRentalId(@Param('id') rentalId: string) {
    return this.rentalService.findOneRentalId(parseInt(rentalId));
  }

  //mencari reservasi  menggunakan buildingId
  @Get('building/:id')
  findOneBuildingId(@Param('id') buildingId: string) {
    return this.rentalService.findOneBuildingId(parseInt(buildingId));
  }

  //mencari reservasi menggunakan userId
  @Get('user/:id')
  findOneUserId(@Param('id') userId: string) {
    return this.rentalService.findOneUserId(parseInt(userId));
  }

  @Get('date/:date')
  async findOneByOrderDate(@Param('date') orderDate : string) {
    return await this.rentalService.findOneByOrderDate(orderDate)
  }

  @Get('event/:event')
  async findOneByEventDate(@Param('event') eventDate : string) {
    return await this.rentalService.findOneByEventDate(eventDate)
  }

  @Patch(':id/update')
  update(@Param('id') rentalId: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.update(+rentalId, updateRentalDto);
  }

  @Delete(':id/delete')
  remove(@Param('id') rentalId: string) {
    return this.rentalService.remove(+rentalId);
  }
}
