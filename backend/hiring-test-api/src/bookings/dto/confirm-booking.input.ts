// src/bookings/dto/confirm-booking.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ConfirmBookingInput {
  @Field()
  id: string;

  @Field()
  fakeToken: string;
}
