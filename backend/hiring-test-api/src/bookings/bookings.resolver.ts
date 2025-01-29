import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entities';
import { CreateBookingInput } from './dto/create-booking.input';
import { ConfirmBookingInput } from './dto/confirm-booking.input';
import { DeleteBookingInput } from './dto/delete-booking.input';
import { Travel } from 'src/travels/entities/travel.entities';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    console.log(createBookingInput); // Verifica l'input
    const { email, travelId, seats } = createBookingInput;
    return await this.bookingsService.create(email, travelId, seats);
  }

  @ResolveField(() => Travel)
  async travel(@Parent() booking: Booking): Promise<Travel> {
    // Usa `booking.travelId` per trovare l'entità Travel
    return this.bookingsService.findTravelById(booking.travel);
  }

  @Mutation(() => Booking)
  async confirmBooking(
    @Args('confirmBookingInput') confirmBookingInput: ConfirmBookingInput,
  ): Promise<Booking> {
    const { id, fakeToken } = confirmBookingInput;
    return await this.bookingsService.confirmBookingWithPayment(id, fakeToken);
  }


 /* @Mutation(() => Booking)
  async cleanupExpiredBookings(
    @Args('deleteBookingInput') deleteBookingInput: DeleteBookingInput,
  ){
     const { id } = deleteBookingInput;
     await this.bookingsService.cleanupExpiredBookingsById(id);
  }*/


  @Mutation(() => Boolean)
async cleanupExpiredBookings(
  @Args('deleteBookingInput') deleteBookingInput: DeleteBookingInput,
): Promise<boolean> {
   const { id } = deleteBookingInput;
   await this.bookingsService.cleanupExpiredBookingsById(id);
   return true; // Se tutto va bene, restituisci true
}


}

