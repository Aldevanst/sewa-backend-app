import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
// import { AuthGuard } from 'src/Auth/auth.guard';

// @UseGuards(AuthGuard)
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post(':userID/create')
  create(
    @Param("userID") userID: string,
    @Body() createBuildingDto: CreateBuildingDto
  ) {
    return this.buildingService.create(parseInt(userID), createBuildingDto);
  }

  @Get('get')
  findAll() {
    console.log('masuk sini')
    return this.buildingService.findAll();
  }

  @Get(':id')
  findOneByBuildingId(@Param('id') id: string) {
    return this.buildingService.findOneByBuildingId(parseInt(id));
  }

  // Mencari buildingId yang di pesan menggunakan userId,
  @Get('user/:user')
  findOneByUserId(@Param('user') user: string) {
    return this.buildingService.findOneUserId(parseInt(user))
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    return this.buildingService.update(+id, updateBuildingDto);
  }

  @Get('price/:price')
  FindWithPrice(@Param ('price')price: string){
    return this.buildingService.findOneByPrice(price);
  }

  @Get('address/:address')
  FindWithAddress(@Param ('address')buildingAddress: string){
    return this.buildingService.findOneByAddress(buildingAddress);
  }

  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    return this.buildingService.remove(+id);
  }
}
