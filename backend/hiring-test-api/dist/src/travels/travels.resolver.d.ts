import { TravelsService } from './travels.service';
import { Travel } from './entities/travel.entities';
import { CreateTravelInput } from './dto/create-travel.input';
export declare class TravelsResolver {
    private readonly travelsService;
    constructor(travelsService: TravelsService);
    travels(): Promise<Travel[]>;
    travel(id: string): Promise<Travel | null>;
    createTravel(createTravelInput: CreateTravelInput): Promise<Travel>;
}
