import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CoinDataDto } from './dto/get-coin-data.dto';

@Injectable()
export class CryptoService {
  async getPrice(coinSymbol: string = 'BTC'): Promise<CoinDataDto> {
    try {
      const { data } = await axios({
        url: `https://rest.coinapi.io/v1/exchangerate/${coinSymbol}/USD`,
        maxBodyLength: Infinity,
        headers: {
          'X-CoinAPI-Key': '3B8EC095-177B-476B-86D3-392ECD268277',
        },
        method: 'get',
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
