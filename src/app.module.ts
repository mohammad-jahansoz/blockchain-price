import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [CryptoModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
