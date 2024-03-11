import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { CreateUserDto } from './dto/CreateUserDto.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      let user: User = this.userRepository.create(createUserDto);

      user = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return omit(user, 'password') as User;
    } catch (err) {
      this.logger.error(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      this.logger.error(err);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .leftJoinAndSelect('user.contacts', 'contacts')
        .getOne();

      return omit(user, 'password') as User;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
