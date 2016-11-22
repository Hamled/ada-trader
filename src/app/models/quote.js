import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: "UNKNOWN",
    price: -1.00
  }
});

export default Quote;
