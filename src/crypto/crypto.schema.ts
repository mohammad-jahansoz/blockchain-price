import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Crypto extends Document {
  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  asset_id_base: String;

  @Prop({ required: true })
  asset_id_quote: String;

  @Prop({ required: true })
  rate: Number;
}

export const CryptoSchema = SchemaFactory.createForClass(Crypto);
