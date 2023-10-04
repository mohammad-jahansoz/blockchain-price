import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoSchema, Crypto } from './crypto.schema';
// import { CryptoSchema1 } from './crypto.model.1';
// import { CryptoSchema2 } from './crypto.model.2';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'CryptoModel', schema: CryptoSchema, collection: 'btc' }],
      'db1',
    ),
    MongooseModule.forFeature(
      [{ name: 'CryptoModel', schema: CryptoSchema, collection: 'btc' }],
      'db2',
    ),
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
