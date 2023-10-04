import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CryptoModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/db1', {
      connectionName: 'db1',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/db2', {
      connectionName: 'db2',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
