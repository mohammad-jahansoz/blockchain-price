import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CoinDataDto } from './dto/get-coin-data.dto';
import { Crypto } from './crypto.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoModule } from './crypto.module';

@Injectable()
export class CryptoService {
  // private cryptos: Crypto[] = [];
  constructor(
    @InjectModel('Crypto') private readonly cryptoModel1: Model<CryptoModule>, //   @InjectModel('db2') private readonly cryptoModel2: Model<Crypto>,
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
      const newPrice = new this.cryptoModel1({ ...data });
      await newPrice.save();
      return { ...data };
    } catch (error) {
      throw new Error(error);
    }
  }
}
