import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CoinType } from './interfaces/coin.interface';
import { Crypto } from './crypto.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoModule } from './crypto.module';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel('CryptoModel', 'db1')
    private readonly cryptoModelDB1: Model<CryptoModule>,
    @InjectModel('CryptoModel', 'db2')
    private readonly cryptoModelDB2: Model<CryptoModule>,
  ) {}

  async getPrice(coinSymbol: string = 'BTC'): Promise<CoinType> {
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

  async saveData(coinData: CoinType): Promise<CoinType> {
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

  @Cron('*/5 * * * * *')
  async saveBtcPrice(): Promise<void> {
    const coinData = await this.getPrice();
    const result = await this.saveData(coinData);
    console.log(result);
  }
}
