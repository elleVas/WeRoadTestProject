import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entities';
import { CreateBookingInput } from './dto/create-booking.input';
import { ConfirmBookingInput } from './dto/confirm-booking.input';
import { Travel } from 'src/travels/entities/travel.entities';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  /*@Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    const { email, travelId, seats } = createBookingInput;
    const booking = await this.bookingsService.create(email, travelId, seats);

    // Restituisci l'intero oggetto booking (incluso travel completo)
    return booking; 
  }*/

  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    const { email, travelId, seats } = createBookingInput;
    return await this.bookingsService.create(email, travelId, seats);
  }
  // Questa è la parte importante
  @ResolveField(() => Travel)
  async travel(@Parent() booking: Booking): Promise<Travel> {
    // Assicurati di avere il metodo che carica il Travel
    return this.bookingsService.findTravelById(booking.travel);
  }

  @Mutation(() => Booking)
  async confirmBooking(
    @Args('confirmBookingInput') confirmBookingInput: ConfirmBookingInput,
  ): Promise<Booking> {
    const { id, fakeToken } = confirmBookingInput;
    return await this.bookingsService.confirmBookingWithPayment(id, fakeToken);
  }
}

