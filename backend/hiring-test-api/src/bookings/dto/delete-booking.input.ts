// src/bookings/dto/create-booking.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteBookingInput {
  @Field()
  id: string;
}

