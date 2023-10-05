import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
// import { NewRecipeInput } from './dto/new-recipe.input';
// import { RecipesArgs } from './dto/recipes.args';
import { Crypto } from './crypto.model';
import { CryptoService } from './crypto.service';

@Resolver((of) => Crypto)
export class CryptoResolver {
  constructor(private readonly cryptoService: CryptoService) {}

  @Query((returns) => Crypto)
  async crypto(): Promise<Crypto> {
    const crypto = await this.cryptoService.getPrice();
    if (!crypto) {
      throw new NotFoundException();
    }
    return crypto;
  }

  @Query((returns) => Crypto)
  lastPrice(@Args('dbNumber') dbNumber: number): Promise<Crypto> {
    return this.cryptoService.getLastPrice(dbNumber);
  }

  //   @Query()
  //   createCronJob(@Args('minutes') minutes: number ){

  //   }
}
