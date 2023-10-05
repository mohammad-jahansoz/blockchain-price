import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CoinType } from './interfaces/coin.interface';
import { Crypto } from './crypto.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoModule } from './crypto.module';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel('CryptoModel', 'db1')
    private readonly cryptoModelDB1: Model<CryptoModule>,
    @InjectModel('CryptoModel', 'db2')
    private readonly cryptoModelDB2: Model<CryptoModule>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async getPrice(): Promise<CoinType> {
    try {
      const { data } = await axios({
        url: `https://rest.coinapi.io/v1/exchangerate/BTC/USD`,
        maxBodyLength: Infinity,
        headers: {
          'X-CoinAPI-Key': '3B8EC095-177B-476B-86D3-392ECD268277',
        },
        method: 'get',
      });

      return { ...data };
    } catch (error) {
      console.log(error);
    }
  }

  async getLastPrice(dbNumber: number): Promise<CoinType> {
    let price;
    if (dbNumber == 1) {
      price = await this.cryptoModelDB1.findOne();
    } else if (dbNumber == 2) {
      price = await this.cryptoModelDB2.findOne();
    } else {
      throw new Error('we havent any database with this number');
    }
    return price;
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

  async createCronJob(second: Number): Promise<boolean> {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      this.schedulerRegistry.deleteCronJob(key);
    });
    const job = new CronJob(`*/${second} * * * * *`, async () => {
      console.log(`get price of btc every ${second} second`);
      const coinData = await this.getPrice();
      const result = await this.saveData(coinData);
      console.log(result);
    });
    this.schedulerRegistry.addCronJob(second.toString(), job);
    job.start();
    return true;
  }

  // @Cron('5 * * * * *')
  // async saveBtcPrice(): Promise<void> {
  //   const coinData = await this.getPrice();
  //   const result = await this.saveData(coinData);
  //   console.log(result);
  // }
}
