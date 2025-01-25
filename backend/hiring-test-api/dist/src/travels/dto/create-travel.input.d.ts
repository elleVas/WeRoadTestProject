declare class MoodsInput {
    nature: number;
    relax: number;
    history: number;
    culture: number;
    party: number;
}
export declare class CreateTravelInput {
    slug: string;
    name: string;
    description: string;
    startingDate: Date;
    endingDate: Date;
    price: number;
    moods?: MoodsInput;
    maxCapacity: number;
    iata: string;
}
export {};
