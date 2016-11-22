import _ from 'underscore';
import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: "UNKNOWN",
    price: -1.00
  },

  initialize: function() {
    var self = this;
    setInterval(function() {
      // Calculate a random price movement
      const maxChange = 1.00;
      const minChange = 0.00;
      var change = _.random(minChange * 10, maxChange * 10) / 10;

      // Decide if the change is positive or negative
      if(_.random(0,1) === 1) {
        change *= -1;
      }

      // Actually trigger the change
      self.priceChange(change);
    }, 1000);
  },

  priceChange: function(price) {
    this.set("price", this.get("price") + price);
  }
});

export default Quote;
