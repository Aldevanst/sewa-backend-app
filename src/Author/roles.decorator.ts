import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enum/role.enum';
// membuat dekorator "Roles" untuk semua class atau handler 
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);