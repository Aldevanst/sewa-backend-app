import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { BuildingModule } from './building/building.module';
import { Building } from './building/entities/building.entity';
import { RentalModule } from './rental/rental.module';
import { Rental } from './rental/entities/rental.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { AuthModule } from './Auth/auth.module';
// import { AuthGuard } from 'src/Auth/auth.guard';
// import { AuthModule } from './Auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from 'src/Author/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sewa_db',
      entities: [
        User,
        Building,
        Rental,
        Admin
      ],
      synchronize: true,
    }),
    UserModule,
    BuildingModule,
    RentalModule,
    AdminModule,
    AuthModule
  ],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // }
  ]
})
export class AppModule {}
