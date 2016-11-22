import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: "UNKNOWN",
    price: -1.00
  },

  priceChange: function(price) {
    this.set("price", this.get("price") + price);
  }
});

export default Quote;
