import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './consts';
import { CreateUserDto } from '../user/dto/CreateUserDto.dto';
import { User } from '../user/entities/user.entity';
import { CreateOrReadUserInput } from '../graphql-types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    createOrReadUserInput: CreateOrReadUserInput,
  ): Promise<User & { access_token: string }> {
    const { email, password: pass } = createOrReadUserInput;

    const user = await this.getAuthenticatedUser(email, pass);

    return {
      ...user,
      access_token: await this.jwtService.signAsync({
        id: user.id,
      }),
    };
  }

  async register(createOrReadUserInput: CreateOrReadUserInput) {
    const hashedPassword = await bcrypt.hash(
      createOrReadUserInput.password,
      SALT_ROUNDS,
    );

    const newDto = new CreateUserDto({
      ...createOrReadUserInput,
      password: hashedPassword,
    });
    const createdUser = await this.userService.create(newDto);

    return {
      ...createdUser,
      access_token: await this.jwtService.signAsync({
        id: createdUser.id,
      }),
    };
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
