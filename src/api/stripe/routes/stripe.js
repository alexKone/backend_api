module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/stripe/products',
      handler: 'stripe.getProducts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/stripe/products/:id',
      handler: 'stripe.getProductById',
      config: {
        policies: [],
        middlewares: [],
      },
    },{
      method: 'POST',
      path: '/stripe/create-checkout-session',
      handler: 'stripe.createCheckoutSession',
      config: {
        policies: [],
        middlewares: [],
      },
    },{
      method: 'POST',
      path: '/stripe/create-portal-session',
      handler: 'stripe.createPortalSession',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
