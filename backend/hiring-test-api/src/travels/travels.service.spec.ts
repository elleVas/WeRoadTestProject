import { Test, TestingModule } from '@nestjs/testing';
import { TravelsService } from './travels.service';
import { Travel } from './entities/travel.entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../bookings/entities/booking.entities';

describe('TravelsService', () => {
  let service: TravelsService;
  let travelRepository: Repository<Travel>;
  let bookingRepository: Repository<Booking>;

const mockBooking = {
  id: '1',
  travel: {
    id: '1',
    slug: 'paris-2025',
    name: 'Paris 2025',
    description: 'A wonderful trip to Paris.',
    description_extended: 'An extended description about the trip to Paris.',
    startingDate: new Date('2025-04-01'),
    endingDate: new Date('2025-04-15'),
    price: 1500,
    moods: {
      nature: 3,
      relax: 4,
      history: 5,
      culture: 4,
      party: 2,
    },
    maxCapacity: 20,
    iata: 'CDG',
    bookings: [], // Associa un array vuoto o contenente mockBooking
  },
  email: 'raffalevasini@gmail.com',
  seats: 2,
  expiresAt: new Date('2025-11-22T00:00:00'),
  isConfirmed: true,
};

  const mockTravelData: Travel[] = [
    {
      id: '1',
      slug: 'paris-2025',
      name: 'Paris 2025',
      description: 'A wonderful trip to Paris.',
      description_extended: 'An extended description about the trip to Paris.',
      startingDate: new Date('2025-04-01'),
      endingDate: new Date('2025-04-15'),
      price: 1500,
      moods: {
        nature: 3,
        relax: 4,
        history: 5,
        culture: 4,
        party: 2,
      },
      maxCapacity: 20,
      iata: 'CDG',
      bookings: [mockBooking],
    },
  ];

  const mockTravel: Travel = mockTravelData[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelsService,
        {
          provide: getRepositoryToken(Travel),
          useValue: {
            find: jest.fn().mockResolvedValue(mockTravelData), // Mock for findAll
            findOne: jest.fn().mockResolvedValue(mockTravel), // Mock for findOne
            save: jest.fn().mockResolvedValue(mockTravel), // Mock for create
          },
        },
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            find: jest.fn().mockResolvedValue([mockBooking]), // Mock for bookings
          },
        },
      ],
    }).compile();

    service = module.get<TravelsService>(TravelsService);
    travelRepository = module.get<Repository<Travel>>(
      getRepositoryToken(Travel),
    );
    bookingRepository = module.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of travels', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockTravelData);
      expect(travelRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single travel', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockTravel);
      expect(travelRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw an error if no travel is found', async () => {
      jest.spyOn(travelRepository, 'findOne').mockResolvedValueOnce(null); // Mocking no result

      try {
        await service.findOne('non-existing-id');
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toBe('Travel not found');
      }
    });
  });

  describe('create', () => {
    it('should create and return a travel', async () => {
      const createTravelInput = {
        slug: 'rome-2025',
        name: 'Rome 2025',
        description: 'A wonderful trip to Rome.',
        description_extended: 'An extended description about the trip to Rome.',
        startingDate: new Date('2025-06-01'),
        endingDate: new Date('2025-06-10'),
        price: 1200,
        moods: { nature: 5, relax: 3, history: 5, culture: 5, party: 1 },
        maxCapacity: 30,
        iata: 'FCO',
      };
      const result = await service.create(createTravelInput);
      expect(result).toEqual(mockTravel);
      expect(travelRepository.save).toHaveBeenCalledWith(createTravelInput);
    });
  });

  describe('booking relationship', () => {
    it('should correctly associate bookings with travels', async () => {
      const travelWithBookings = await service.findOne('1');
      expect(travelWithBookings?.bookings).toEqual([mockBooking]);
      expect(bookingRepository.find).toHaveBeenCalled();
    });
  });

  describe('moods field', () => {
    it('should correctly handle the moods JSON field', async () => {
      const travel = await service.findOne('1');
      expect(travel?.moods).toEqual(mockTravel.moods);
      expect(travel?.moods?.nature).toBe(3);
      expect(travel?.moods?.relax).toBe(4);
    });
  });
});
