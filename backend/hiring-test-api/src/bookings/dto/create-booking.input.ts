// src/bookings/dto/create-booking.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field()
  email: string;

  @Field()
  travelId: string;

  @Field()
  seats: number;
}

