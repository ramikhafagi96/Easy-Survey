const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const chargePayment = async (token) => {
    return await stripe.charges.create(
        {
          amount: 500,
          currency: 'usd',
          source: token,
          description: '5$ for 5 credits',
        }
      );
}

module.exports = {
    chargePayment
}