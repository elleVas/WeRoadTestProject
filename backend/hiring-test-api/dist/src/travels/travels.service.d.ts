import { Repository } from 'typeorm';
import { Travel } from './entities/travel.entities';
import { CreateTravelInput } from './dto/create-travel.input';
export declare class TravelsService {
    private readonly travelRepository;
    constructor(travelRepository: Repository<Travel>);
    findAll(): Promise<Travel[]>;
    findOne(id: string): Promise<Travel | null>;
    create(createTravelInput: CreateTravelInput): Promise<Travel>;
}
