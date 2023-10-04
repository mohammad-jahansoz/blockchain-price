import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'crypto ' })
export class Crypto {
  @Field({ nullable: true })
  time: string;
  //   time: Date;

  @Field({ nullable: true })
  asset_id_base: string;

  @Field({ nullable: true })
  asset_id_quote: string;

  @Field({ nullable: true })
  rate: number;
}
