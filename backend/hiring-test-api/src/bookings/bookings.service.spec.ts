/*import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entities';
import { Travel } from '../travels/entities/travel.entities';

const mockBookingRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

const mockTravelRepository = {
  findOne: jest.fn(),
};

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingRepository: Repository<Booking>;
  let travelRepository: Repository<Travel>;

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
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    bookingRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    travelRepository = module.get<Repository<Travel>>(getRepositoryToken(Travel));
  });

  it('should create a booking successfully', async () => {
    const travel = { id: '1', name: 'Sample Travel' } as Travel;
    const bookingInput = {
      email: 'test@example.com',
      seats: 2,
      travelId: '1',
    };

    jest.spyOn(travelRepository, 'findOne').mockResolvedValue(travel);
    jest.spyOn(bookingRepository, 'create').mockImplementation((input) => input);
    jest.spyOn(bookingRepository, 'save').mockResolvedValue({ id: '123', ...bookingInput });

    const result = await service.create(bookingInput);

    expect(result).toEqual({ id: '123', ...bookingInput });
    expect(travelRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(bookingRepository.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      seats: 2,
      travel: travel,
    });
    expect(bookingRepository.save).toHaveBeenCalled();
  });

  it('should throw an error if travel does not exist', async () => {
    jest.spyOn(travelRepository, 'findOne').mockResolvedValue(null);

    await expect(
      service.create({
        email: 'test@example.com',
        seats: 2,
        travelId: '1',
      }),
    ).rejects.toThrow('Travel with ID 1 not found');

    expect(travelRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});*/
