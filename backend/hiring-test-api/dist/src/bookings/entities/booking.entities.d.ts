import { Travel } from '../../travels/entities/travel.entities';
export declare class Booking {
    id: string;
    email: string;
    seats: number;
    isConfirmed: boolean;
    expiresAt: Date | null;
    travel: Travel;
}
