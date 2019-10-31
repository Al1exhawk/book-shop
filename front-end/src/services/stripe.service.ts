import { BaseService } from "./base.service";

class StripeService extends BaseService {

    loadStrpe() {
        if(!window.document.getElementById('stripe-script')) {
            const stripe = window.document.createElement("script");
            stripe.id = "stripe-script";
            stripe.type = "text/javascript";
            stripe.src = "https://checkout.stripe.com/checkout.js";      
            window.document.body.appendChild(stripe);
          }
    }

    async checkout (amount: number) {
        const handler = (window as any).StripeCheckout.configure({
            key: 'pk_test_7ggPhvQ5Kh3opZ6h358HGXjK00qyZOOH7D',
            locale: 'auto',
            token:  (token: any) => {   
              const data = {  
                amount,
                token
              }
              console.log('data', data);
              this.send(data);          
            }
          });
        
          handler.open({
            name: 'Book Shop',
            description: 'Thanks for choosing us!',
            amount: amount * 100
          })
    }

    async send(data: any) {
      const charge =  await this.axiosInstance.post('/checkout', data);
     
      return charge;
    }

}

export const stripeService = new StripeService();