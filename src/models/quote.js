import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  buy() {
    this.trigger('trade', {
      symbol: this.get('symbol'),
      price: this.get('price'),
      buy: true,
    });

    this.set('price', this.get('price') + 1.00);
  },

  sell() {
    this.trigger('trade', {
      symbol: this.get('symbol'),
      price: this.get('price'),
      buy: false,
    });

    this.set('price', this.get('price') - 1.00);
  },
});

export default Quote;
