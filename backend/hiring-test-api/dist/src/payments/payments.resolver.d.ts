import { PaymentsService } from './payments.service';
export declare class PaymentsResolver {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    makePayment(bookingId: string, fakeToken: string): Promise<string>;
}
