import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entities';
import { CreateBookingInput } from './dto/create-booking.input';
import { ConfirmBookingInput } from './dto/confirm-booking.input';
import { Travel } from 'src/travels/entities/travel.entities';
export declare class BookingsResolver {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    createBooking(createBookingInput: CreateBookingInput): Promise<Booking>;
    travel(booking: Booking): Promise<Travel>;
    confirmBooking(confirmBookingInput: ConfirmBookingInput): Promise<Booking>;
}
