import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entities';
import { CreateBookingInput } from './dto/create-booking.input';
import { Travel } from '../travels/entities/travel.entities';
export declare class BookingsResolver {
    private readonly bookingRepository;
    private readonly travelRepository;
    constructor(bookingRepository: Repository<Booking>, travelRepository: Repository<Travel>);
    findAll(): Promise<Booking[]>;
    create(createBookingInput: CreateBookingInput): Promise<Booking>;
}
