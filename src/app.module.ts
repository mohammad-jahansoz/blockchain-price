import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
@Module({
  imports: [
    CryptoModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/db1', {
      connectionName: 'db1',
      lookup: undefined,
      family: undefined,
      hints: undefined,
      localAddress: undefined,
      localPort: undefined,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/db2', {
      connectionName: 'db2',
      lookup: undefined,
      family: undefined,
      hints: undefined,
      localAddress: undefined,
      localPort: undefined,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
