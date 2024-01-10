import { SetMetadata } from '@nestjs/common';
// dekorator yang bisa digunakan di berbagai class atau handler (terutama di controller)
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
