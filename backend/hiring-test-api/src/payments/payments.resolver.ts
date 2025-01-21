import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => String)
  async makePayment(
    @Args('bookingId') bookingId: string,
    @Args('fakeToken') fakeToken: string,
  ): Promise<string> {
    const result = await this.paymentsService.processPayment(
      bookingId,
      fakeToken,
    );
    if (!result.success) {
      throw new Error(result.message);
    }
    return result.message;
  }
}
