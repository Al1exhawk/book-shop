import { Controller, Body, Post} from '@nestjs/common';
import { StripeService } from '../services';

@Controller('checkout')

export class StripeCustomerController {

    constructor(private readonly stripeService: StripeService) {}

    @Post('')
    create(@Body() data) {
        const customer = this.stripeService.checkout(data);
        return customer;
    }

}
