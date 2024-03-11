import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto.dto';
import { RegisterDto } from './dto/RegisterDto.dto';
import { Resolver } from '@nestjs/graphql';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
