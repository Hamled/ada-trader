import Backbone from 'backbone';

const Trade = Backbone.Model.extend({
  defaults: {
    symbol: "UNKNOWN",
    quantity: 0,
    price: -1,
    type: "UNKNOWN",
    date: new Date(1969, 0, 1)
  }
});

export default Trade;
