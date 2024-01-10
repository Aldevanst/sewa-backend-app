import { Body, Get, Controller, HttpCode, HttpStatus, Post, UseGuards ,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { AuthGuard } from 'src/Auth/auth.guard';


@Controller('auth')
export class AuthController {
    constructor (private authService : AuthService){}

    @Get('get')
    get(){
      return 'hello'
    }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login/user')
    signInForUser(@Body() signInDto: any) {
      return this.authService.signInForUser(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login/admin')
    signInForAdmin(@Body() user: any) {
      return this.authService.signInForAdmin(user.username, user.password);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req){
        return req.user
    }
}
