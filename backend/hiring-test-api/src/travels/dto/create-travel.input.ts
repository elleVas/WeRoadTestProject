import { InputType, Field, Int } from '@nestjs/graphql';

// Definisci il tipo per 'moods'
@InputType()
class MoodsInput {
  @Field(() => Int)
  nature: number;

  @Field(() => Int)
  relax: number;

  @Field(() => Int)
  history: number;

  @Field(() => Int)
  culture: number;

  @Field(() => Int)
  party: number;
}

@InputType()
export class CreateTravelInput {
  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  price: number;

  // Usa il tipo 'MoodsInput' esplicitamente
  @Field((type) => MoodsInput, { nullable: true })
  moods?: MoodsInput;

  @Field()
  maxCapacity: number;

 @Field()
  iata: string;
}
