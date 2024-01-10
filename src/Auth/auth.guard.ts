import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/Auth/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

 async canActivate(context: ExecutionContext):Promise<boolean>{
    //Mengecek jika di sebuah class controlled atau di handler terdapat dekorator @Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    // Mengambil objek request dari HTTP saat ini
    const request = context.switchToHttp().getRequest();
    //mengambil token header dari request dengan fungsi(lihat di bawah sendiri)
    const token = this.extractTokenFromHeader(request)
    // mencari tahu apakah terdapat token atau tidak
    if (!token) {
      throw new UnauthorizedException("Please Login first");
    }
    try {
    // men-verifikasi jwttoken sebelumnya,apakah token valid atau tidak
      const payload =  this.jwtService.verifyAsync(token, {
        secret: "test"
      });
      // We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload; // fungsi untuk dekkorator @get('profile')di controller
      
    } catch {
    throw new UnauthorizedException("error 'canActivate'");
    }
    return true;
  }
  // mengekstrak jwttoken dari headersnya "request"
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
