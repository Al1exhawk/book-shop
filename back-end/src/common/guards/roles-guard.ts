import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getClass());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = (): boolean => roles.includes(user.role);
        const isMatch = hasRole();

        if ( user && user.role && isMatch ) {
            return true;
        } else {
            throw new HttpException('You do not have premmission (Roles)', HttpStatus.UNAUTHORIZED);
        }
    }
}
