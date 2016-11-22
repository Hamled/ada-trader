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
    this.trigger("price-change", +100.00); // Everyone's richer!
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
