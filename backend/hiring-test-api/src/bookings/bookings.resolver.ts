import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entities';
import { CreateBookingInput } from './dto/create-booking.input';
import { Travel } from '../travels/entities/travel.entities';

@Injectable()
export class BookingsResolver {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['travel'] });
  }

  async create(createBookingInput: CreateBookingInput): Promise<Booking> {
    const { travelId, ...bookingData } = createBookingInput;

    // Verifica che il viaggio esista
    const travel = await this.travelRepository.findOne({
      where: { id: travelId },
    });
    if (!travel) {
      throw new Error(`Travel with ID ${travelId} not found`);
    }

    const booking = this.bookingRepository.create({
      ...bookingData,
      travel,
    });

    return this.bookingRepository.save(booking);
  }
}
