import * as mongoose from 'mongoose';

export const CryptoSchema1 = new mongoose.Schema({
  time: { type: Date, required: true },
  asset_id_base: { type: String, required: true },
  asset_id_quote: { type: String, required: true },
  rate: { type: Number, required: true },
});

export interface Crypto extends mongoose.Document {
  id: string;
  time: Date;
  asset_id_base: String;
  asset_id_quote: String;
  rate: Number;
}
