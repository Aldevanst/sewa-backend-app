import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  //Mengecek jika di sebuah class controlled atau di handler terdapat dekorator @Roles
   canActivate(context: ExecutionContext):boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  
    if (!requiredRoles) {
      return true;
    }
    // Mengambil objek request dari HTTP saat ini
    const  request  = context.switchToHttp().getRequest();
    const requestBearer = request.headers.authorization?.split(' ')[1] //Mengextract jwttoken yang ada di request.header
    const requestToken = this.jwtService.decode(requestBearer) //mengartikan jwttoken atau mendecode jwttoken untuk mengetahui isinya
    // mencari tahu apakah token ada/tidak
    if (!requestToken){
      throw new UnauthorizedException("No access")
    } 
    //mencocokkan role dari token dengan "requiredRoles"
    return requiredRoles.some((role) => requestToken.role.includes(role))
    
  
  }}