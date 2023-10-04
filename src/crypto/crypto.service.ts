import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CoinDataDto } from './dto/get-coin-data.dto';
import { Crypto } from './crypto.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoModule } from './crypto.module';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel('CryptoModel', 'db1')
    private readonly cryptoModelDB1: Model<CryptoModule>,
    @InjectModel('CryptoModel', 'db2')
    private readonly cryptoModelDB2: Model<CryptoModule>,
  ) {}

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
      return { ...data };
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveData(coinData: CoinDataDto): Promise<CoinDataDto> {
    const date = new Date(coinData.time);
    let newPrice;
    if (date.getHours() < 12) {
      newPrice = new this.cryptoModelDB2({ ...coinData });
    } else {
      newPrice = new this.cryptoModelDB1({ ...coinData });
    }
    await newPrice.save();
    return newPrice;
  }
}
