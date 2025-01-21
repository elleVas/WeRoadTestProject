// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Booking } from './entities/booking.entities';
import { Travel } from '../travels/entities/travel.entities';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly paymentsService: PaymentsService,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}

  async create(email: string, travelId: string, seats: number) {
    const travel = await this.travelRepository.findOneBy({ id: travelId });
    if (!travel) {
      throw new Error('Travel not found');
    }

    const activeBookings = await this.bookingRepository.find({
      where: { travel, isConfirmed: false },
    });

    const reservedSeats = activeBookings.reduce((sum, b) => sum + b.seats, 0);
    if (reservedSeats + seats > travel.maxCapacity) {
      throw new Error('Not enough available seats');
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const booking = this.bookingRepository.create({
      email,
      seats,
      expiresAt,
      travel,
    });

    return await this.bookingRepository.save(booking);
  }

  async confirmBookingWithPayment(id: string, fakeToken: string) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking || booking.isConfirmed) {
      throw new Error('Invalid booking');
    }

    // Simula il pagamento
    const paymentResult = await this.paymentsService.processPayment(
      id,
      fakeToken,
    );
    if (!paymentResult.success) {
      throw new Error(paymentResult.message);
    }

    booking.isConfirmed = true; // Confermiamo la prenotazione
    booking.expiresAt = null; // Rimuoviamo l'expiration date dopo la conferma

    return await this.bookingRepository.save(booking);
  }

  async cleanupExpiredBookings() {
    const now = new Date();
    const expired = await this.bookingRepository.find({
      where: { expiresAt: LessThanOrEqual(now), isConfirmed: false },
    });
    return await this.bookingRepository.remove(expired);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async cleanupExpiredBookingsTask() {
    await this.cleanupExpiredBookings();
  }
}
