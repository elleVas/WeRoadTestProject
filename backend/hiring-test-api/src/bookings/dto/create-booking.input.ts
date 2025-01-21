import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field()
  email: string;

  @Field()
  seats: number;

  @Field()
  paymentStatus: string;

  @Field()
  expiresAt: Date | null;

  @Field()
  travelId: string; // ID del viaggio associato
}
