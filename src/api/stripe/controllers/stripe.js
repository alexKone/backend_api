'use strict';

/**
 * A set of functions called "actions" for `stripe`
 */
const stripe = require('stripe')(process.env.STRIPE_SK_TEST, {
  apiVersion: '2022-08-01',
});

module.exports = {
  getProducts: async (ctx, next) => {
    try {
      const products = await stripe.products.list();
      ctx.body = {
        datas: products.data
      };
    } catch (err) {
      ctx.body = err;
    }
  },

  getProductById: async (ctx, next) => {
    try {
      const product = await stripe.products.retrieve(ctx.params.id);
      const price = await stripe.prices.search({
        query: `product: "${ctx.params.id}"`,
      });

      ctx.body = {
        product,
        price: price.data[0]
      };
    } catch (err) {
      ctx.body = err;
    }
  },

  createCheckoutSession: async (ctx, next) => {
    try {
      const prices = await stripe.prices.search({
        query: `product: "${ctx.request.body['lookup_keys']}"`
      });
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [{
          price: prices.data[0].id,
          quantity: 1
        }],
        mode: 'subscription',
        success_url: `http://localhost:4200/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:4200/payment?canceled=true`,
      });
      ctx.body = session;
    } catch (err) {
      ctx.body = err
    }
  },
  createPortalSession: async (ctx, next) => {
    try {
      const session_id = ctx.request.body['session_id'];
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

      // This is the url to which the customer will be redirected when they are done
      // managing their billing with the portal.
      const returnUrl = 'http://localhost:4200/portal';

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnUrl,
      });
    } catch (err) {
      ctx.body = err;
    }
  }
};
