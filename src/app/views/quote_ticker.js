import _ from 'underscore';
import Backbone from 'backbone';

const QuoteTicker = Backbone.View.extend({
  initialize: function() {
    // Setup our compiled template function using the template code
    // from our index HTML

    const templateString = Backbone.$('#tmpl-quote-ticker').html();
    this.template = _.template(templateString);

    // Setup an event handler for when we receive a "price-change" event
    this.on("price-change", this.onPriceChange);

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
      self.trigger("price-change", change);
    }, 1000);
  },

  render: function() {
    this.$el.html(this.template(this.model));
    return this;
  },

  onPriceChange: function(price) {
    this.model.price += price;
    this.render();
  }
});

export default QuoteTicker;
