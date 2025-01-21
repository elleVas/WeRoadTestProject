// src/travels/travels.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TravelsService } from './travels.service';
import { Travel } from './entities/travel.entities';
import { CreateTravelInput } from './dto/create-travel.input';

@Resolver(() => Travel)
export class TravelsResolver {
  constructor(private readonly travelsService: TravelsService) {}

  @Query(() => [Travel])
  async travels(): Promise<Travel[]> {
    const travels = await this.travelsService.findAll();
    console.log(travels);
    return travels.map((travel) => {
      // Se necessario, assicurati che la data venga serializzata correttamente
      if (travel.startingDate) {
        travel.startingDate = new Date(travel.startingDate);
      } else if (travel.endingDate) {
        travel.endingDate = new Date(travel.endingDate);
      }
      return travel;
    });
  }

  @Query(() => Travel)
  travel(@Args('id') id: string) {
    return this.travelsService.findOne(id);
  }

  @Mutation(() => Travel)
  createTravel(
    @Args('createTravelInput') createTravelInput: CreateTravelInput,
  ): Promise<Travel> {
    return this.travelsService.create(createTravelInput);
  }
}
