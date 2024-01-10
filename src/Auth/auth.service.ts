import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private jwtService: JwtService
    ) { }
    
    async signInForUser(username: string, pass: string) {
        const user = await this.userRepository.findOne({
            where: {
                name: username //mencari nama user di repository user dengan mencocokkan yang sudah di input
            }
        })
        //mencocokkan jika password yang di inputkan apakah cocok dengan password user yang ada di repository user
        if (user?.password !== pass) {
            throw new NotAcceptableException("invalid user login");
        }
        // memasukkan isi payload
        const payload = { sub: user.userID, username: user.name ,role: user.role};

        // TODO: Generate a JWT and return it here
        // instead of the user object
        //men-generate jwt token dari header.payload."secret(di Auth.module)"
        return {
            access_token: await this.jwtService.signAsync(payload),
            userID: user.userID
        };
    }


    async signInForAdmin(username: string, pass: string) {
        const admin = await this.adminRepository.findOne({
            where: {
                adminName: username
            }
        })

        if (admin?.password !== pass) {
            throw new UnauthorizedException("invalid admin login");
        }
        const payload = { sub: admin.adminId, username: admin.adminName,role: admin.role};

        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
