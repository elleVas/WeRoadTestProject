import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { Booking } from './entities/booking.entities';
import { Travel } from '../travels/entities/travel.entities';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Travel]), // Registra Booking e Travel
    PaymentsModule, // Importa PaymentsModule per accedere a PaymentsService
  ],
  providers: [BookingsService, BookingsResolver],
})
export class BookingsModule {}
