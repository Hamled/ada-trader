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

  validate(attributes, options) {
    const quote = attributes.quote;
    if(!quote) {
      return ['Invalid stock'];
    }

    const errors = [];

    const symbol = attributes.symbol;
    if(!symbol || typeof symbol !== 'string' || symbol !== quote.get('symbol')) {
      errors.push('Invalid stock symbol');
    }

    const targetPrice = attributes.targetPrice;
    if(!targetPrice || Number.isNaN(targetPrice) || targetPrice <= 0.00) {
      errors.push('Invalid target price');
    }

    const quotePrice = quote.get('price');
    const buy = attributes.buy;
    if(buy && targetPrice > quotePrice) {
      errors.push('Price higher than market price!');
    }

    if(!buy && targetPrice < quotePrice) {
      errors.push('Price lower than market price!');
    }

    return errors.length > 0 ? errors : false;
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
