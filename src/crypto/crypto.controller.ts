import { Controller, Get } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CoinType } from './interfaces/coin.interface';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  async getCoinData(): Promise<CoinType> {
    // get price with params or body or query
    return this.cryptoService.getPrice('BTC');
  }
}
