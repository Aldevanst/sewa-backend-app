import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
// import { AuthGuard } from 'src/Auth/auth.guard';
// import { Roles } from 'src/Author/roles.decorator';
// import { Role } from 'src/enum/role.enum';


// @UseGuards(AuthGuard)
// @Roles(Role.Admin)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('post')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('get')
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') adminId: string) {
    return this.adminService.findOneById(+adminId);
  }

  @Get('name/:name')
  findOneByName(@Param('name') adminName: string) {
    return this.adminService.findOneByName(adminName);
  }

  
  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id/delete')
  remove(@Param('id') id: string) {
    const removedadmin = this.adminService.remove(+id);
    return removedadmin
  }
}
