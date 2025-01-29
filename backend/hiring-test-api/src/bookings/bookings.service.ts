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
    // Recupera il viaggio
    const travel = await this.travelRepository.findOneBy({ id: travelId });
    if (!travel) {
      throw new Error('Travel not found');
    }

    // Trova le prenotazioni attive per quel viaggio
    const activeBookings = await this.bookingRepository.find({
      where: { travel: { id: travelId }, isConfirmed: false },
      relations: ['travel'],
    });

    // Calcola i posti già prenotati
    const reservedSeats = activeBookings.reduce(
      (sum, booking) => sum + booking.seats,
      0,
    );

    // Verifica se ci sono posti sufficienti disponibili
    if (seats > travel.maxCapacity) {
      throw new Error('Not enough available seats');
    }

    // Sottrae i posti prenotati dalla disponibilità di posti
    travel.maxCapacity -= seats;

    // Salva l'aggiornamento del viaggio per i posti disponibili si ferma a 0
    if (travel.maxCapacity >= 0) {
      await this.travelRepository.save(travel);
    }
    // Imposta la data di scadenza della prenotazione
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Crea la prenotazione
    const booking = this.bookingRepository.create({
      email,
      seats,
      expiresAt,
      travel,
    });

    // Salva la prenotazione
    return await this.bookingRepository.save(booking);
  }

  async findTravelById(travelData: Travel): Promise<Travel> {
    const travel = await this.travelRepository.findOne({
      where: { id: travelData.id },
    });
    if (!travel) {
      //errore se il viaggio non esiste
      throw new Error(`Travel with id ${travel} not found`);
    }
    return travel;
  }

  async confirmBookingWithPayment(id: string, fakeToken: string) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking || booking.isConfirmed) {
      throw new Error('Invalid booking');
    }
    // Controlla se la prenotazione è scaduta
    if (booking.expiresAt && booking.expiresAt < new Date()) {
      throw new Error('Booking has expired');
    }
    // Simula il pagamento
    const paymentResult = await this.paymentsService.processPayment(
      id,
      fakeToken,
    );
    if (!paymentResult.success) {
      throw new Error(paymentResult.message);
    }
    // Conferma la prenotazione
    booking.isConfirmed = true;
    // Rimuove l'expiration date dopo la conferma
    booking.expiresAt = null;

    return await this.bookingRepository.save(booking);
  }

  async cleanupExpiredBookings() {
    const now = new Date();

    // Trova tutte le prenotazioni scadute e non confermate
    const expiredBookings = await this.bookingRepository.find({
      where: { expiresAt: LessThanOrEqual(now), isConfirmed: false },
      //carica il viaggio associato
      relations: ['travel'],
    });

    // Aggiorna i posti del viaggio per ogni prenotazione eliminata
    for (const booking of expiredBookings) {
      const travel = booking.travel;
      const seatsToAdd = booking.seats;
      // Aggiorna il campo 'seats' del viaggio
      travel.maxCapacity += seatsToAdd;

      // Salva il viaggio aggiornato
      await this.travelRepository.save(travel);

      // Ora rimuovi la prenotazione scaduta
      await this.bookingRepository.remove(booking);
    }
  }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async cleanupExpiredBookingsTask() {
    await this.cleanupExpiredBookings();
  }
 
  
  async cleanupExpiredBookingsById(id: string): Promise<boolean> {
    // Trova la prenotazione scaduta e non confermata
    const booking = await this.bookingRepository.findOne({
      where: { id, isConfirmed: false },
      relations: ['travel'],
    });

    if (!booking) {
       return false; 
    }

    const travel = booking.travel;
    if (travel) {
       
        travel.maxCapacity += booking.seats;
        await this.travelRepository.save(travel);
    }

    await this.bookingRepository.remove(booking);
    return true; 
}




}
