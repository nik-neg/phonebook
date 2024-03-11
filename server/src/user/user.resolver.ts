import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Resolver } from '@nestjs/graphql';

@Resolver('user')
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
