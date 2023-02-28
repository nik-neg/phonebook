import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactModule } from './contact/contact.module';
import { FilterModule } from './filter/filter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity.js'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      formatError: (error) => {
        const { message, locations, extensions } = error;
        return { message, locations, extensions };
      },
    }),
    ContactModule,
    FilterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
