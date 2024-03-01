import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AppModule } from '../app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'test_db',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true, // Be cautious with this in production!
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  const testCases = [
    {
      description: 'signIn - Fail due to invalid email',
      path: '/auth/login',
      dto: { email: 'invalid', password: '123456' },
      expectedStatus: HttpStatus.BAD_REQUEST,
    },
    {
      description: 'register - Fail due to missing first_name',
      path: '/auth/register',
      dto: { email: 'test@example.com', last_name: 'Doe', password: '12345678' },
      expectedStatus: HttpStatus.BAD_REQUEST,
    },
    // Add more test cases as needed
  ];

  testCases.forEach(({ description, path, dto, expectedStatus }) => {
    it(description, () => {
      return request(app.getHttpServer())
        .post(path)
        .send(dto)
        .expect(expectedStatus);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
