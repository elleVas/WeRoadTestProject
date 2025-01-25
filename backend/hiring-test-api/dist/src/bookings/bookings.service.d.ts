import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entities';
import { Travel } from '../travels/entities/travel.entities';
import { PaymentsService } from '../payments/payments.service';
export declare class BookingsService {
    private readonly bookingRepository;
    private readonly paymentsService;
    private readonly travelRepository;
    constructor(bookingRepository: Repository<Booking>, paymentsService: PaymentsService, travelRepository: Repository<Travel>);
    create(email: string, travelId: string, seats: number): Promise<Booking>;
    findTravelById(travelData: Travel): Promise<Travel>;
    confirmBookingWithPayment(id: string, fakeToken: string): Promise<Booking>;
    cleanupExpiredBookings(): Promise<void>;
    cleanupExpiredBookingsTask(): Promise<void>;
}
