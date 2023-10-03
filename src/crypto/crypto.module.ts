import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
