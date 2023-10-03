import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoSchema } from './crypto.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Crypto', schema: CryptoSchema, collection: 'btc' }],
      // 'db1',
    ),
    //   MongooseModule.forFeature(
    //     [{ name: 'db2', schema: CryptoSchema, collection: 'btc' }],
    //     'db2',
    //   ),
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
