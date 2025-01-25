import { Booking } from '../../bookings/entities/booking.entities';
declare class Moods {
    nature: number;
    relax: number;
    history: number;
    culture: number;
    party: number;
}
export declare class Travel {
    id: string;
    slug: string;
    name: string;
    description: string;
    description_extended: string;
    startingDate: Date;
    endingDate: Date;
    get formattedEndingDate(): Date | null;
    price: number;
    moods?: Moods;
    maxCapacity: number;
    iata: string;
    bookings: Booking[];
}
export {};
