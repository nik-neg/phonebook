import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import process from 'process';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION}s` },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
