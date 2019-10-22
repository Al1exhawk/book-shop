import { Injectable } from '@nestjs/common';
import { ConfigService } from '.';
import * as Stripe from 'stripe';

@Injectable()
export class StripeService {
    constructor(private readonly configService: ConfigService) {}

    private stripe = new Stripe(this.configService.STRIPE_SECRET_API_KEY);

    async checkout(data) {
        const customer = await this.stripe.customers.create({
           email: data.token.email,
        });
        const source = await this.stripe.customers.createSource(customer.id, {source: data.token.id});

        const charge = await this.stripe.charges.create({
            amount: data.amount * 100,
            currency: 'usd',
            customer: source.customer,
          });

        return charge;

    }
}
