import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  defaults: {
    quote: null,
    symbol: 'UNDEF',
    targetPrice: 0.00,
    buy: true,
  },

  initialize(attributes, options) {
    // TODO: throw an error if quote attribute is not given

    if(attributes.quote) {
      this.set('symbol', attributes.quote.get('symbol'));
    }

    this.listenTo(this.get('quote'), 'change:price', this.execute);
  },

  execute(quote) {
    const buy = this.get('buy');
    const quotePrice = quote.get('price');
    const targetPrice = this.get('targetPrice');

    if(buy && quotePrice <= targetPrice) {
      // Destroy first to prevent repeat executions
      this.destroy();
      quote.buy();
    }

    if(!buy && quotePrice >= targetPrice) {
      // Destroy first to prevent repeat executions
      this.destroy();
      quote.sell();
    }
  },
});

export default Order;
