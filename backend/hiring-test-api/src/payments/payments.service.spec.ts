import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from '../bookings/bookings.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from '../bookings/entities/booking.entities';
import { Travel } from '../travels/entities/travel.entities';
import { PaymentsService } from '../payments/payments.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingRepository: Repository<Booking>;
  let travelRepository: Repository<Travel>;
  let paymentsService: PaymentsService;

  const mockBookingRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  const mockTravelRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  const mockPaymentsService = {
    processPayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockBookingRepository,
        },
        {
          provide: getRepositoryToken(Travel),
          useValue: mockTravelRepository,
        },
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    bookingRepository = module.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
    travelRepository = module.get<Repository<Travel>>(
      getRepositoryToken(Travel),
    );
    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new booking', async () => {
      const travel = { id: 'travel-id', maxCapacity: 10, price: 100 } as Travel;
      const booking = {
        id: 'booking-id',
        email: 'test@example.com',
        seats: 2,
      } as Booking;

      mockTravelRepository.findOneBy.mockResolvedValue(travel);
      mockBookingRepository.find.mockResolvedValue([]);
      mockBookingRepository.create.mockReturnValue(booking);
      mockBookingRepository.save.mockResolvedValue(booking);

      const result = await service.create('test@example.com', 'travel-id', 2);

      expect(mockTravelRepository.findOneBy).toHaveBeenCalledWith({
        id: 'travel-id',
      });
      expect(mockBookingRepository.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        seats: 2,
        expiresAt: expect.any(Date),
        travel,
      });
      expect(mockBookingRepository.save).toHaveBeenCalledWith(booking);
      expect(result).toEqual(booking);
    });

    it('should throw an error if travel is not found', async () => {
      mockTravelRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.create('test@example.com', 'invalid-id', 2),
      ).rejects.toThrow('Travel not found');
    });

    it('should throw an error if not enough seats are available', async () => {
      const travel = { id: 'travel-id', maxCapacity: 1, price: 100 } as Travel;

      mockTravelRepository.findOneBy.mockResolvedValue(travel);

      await expect(
        service.create('test@example.com', 'travel-id', 2),
      ).rejects.toThrow('Not enough available seats');
    });
  });

  describe('confirmBookingWithPayment', () => {
    it('should confirm a booking if payment is successful', async () => {
      const booking = {
        id: 'booking-id',
        isConfirmed: false,
        expiresAt: new Date(Date.now() + 1000),
      } as Booking;

      mockBookingRepository.findOneBy.mockResolvedValue(booking);
      mockPaymentsService.processPayment.mockResolvedValue({ success: true });

      const result = await service.confirmBookingWithPayment(
        'booking-id',
        'fake-token',
      );

      expect(mockPaymentsService.processPayment).toHaveBeenCalledWith(
        'booking-id',
        'fake-token',
      );
      expect(mockBookingRepository.save).toHaveBeenCalledWith({
        ...booking,
        isConfirmed: true,
        expiresAt: null,
      });
      expect(result).toEqual({
        ...booking,
        isConfirmed: true,
        expiresAt: null,
      });
    });

    it('should throw an error if booking is not found', async () => {
      mockBookingRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.confirmBookingWithPayment('invalid-id', 'fake-token'),
      ).rejects.toThrow('Invalid booking');
    });
  });

  describe('cleanupExpiredBookings', () => {
    it('should remove expired bookings and update travel capacity', async () => {
      const travel = { id: 'travel-id', maxCapacity: 5 } as Travel;
      const expiredBooking = { id: 'booking-id', seats: 2, travel } as Booking;

      mockBookingRepository.find.mockResolvedValue([expiredBooking]);
      mockTravelRepository.save.mockResolvedValue({
        ...travel,
        maxCapacity: 7,
      });

      await service.cleanupExpiredBookings();

      expect(mockBookingRepository.find).toHaveBeenCalledWith({
        where: { expiresAt: expect.any(Date), isConfirmed: false },
        relations: ['travel'],
      });
      expect(mockTravelRepository.save).toHaveBeenCalledWith({
        ...travel,
        maxCapacity: 7,
      });
      expect(mockBookingRepository.remove).toHaveBeenCalledWith(expiredBooking);
    });
  });
});
