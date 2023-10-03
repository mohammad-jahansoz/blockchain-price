import { Controller, Get } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CoinDataDto } from './dto/get-coin-data.dto';
import { Cron } from '@nestjs/schedule';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Cron('*/5 * * * * *')
  async updateBtcPrice(): Promise<void> {
    console.log(await this.cryptoService.getPrice());
  }

  @Get()
  async getCoinData(): Promise<CoinDataDto> {
    // get price with params or body or query
    return this.cryptoService.getPrice('BTC');
  }
}
