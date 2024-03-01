import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactModule } from './contact/contact.module';
import { FilterModule } from './filter/filter.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import process from 'process';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) ?? 'postgres',
      host: process.env.HOST ?? 'localhost',
      port: parseInt(process.env.PORT, 10) ?? 5432,
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'pass123',
      database: process.env.DATABASE ?? 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity.js'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION}s` },
    }),
    ContactModule,
    FilterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
