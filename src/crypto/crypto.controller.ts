import { Controller, Get } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CoinDataDto } from './dto/get-coin-data.dto';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly crtptoService: CryptoService) {}

  @Get()
  async getCoinData(): Promise<CoinDataDto> {
    return this.crtptoService.getPrice('BTC');
  }
}
