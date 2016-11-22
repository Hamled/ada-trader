import _ from 'underscore';
import Backbone from 'backbone';
import QuoteTicker from 'app/views/quote_ticker';

const ApplicationView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    // Create a new place for this quote ticker
    // to be attached
    const tickerContainer = Backbone.$('<div>');
    // Put it into the application view
    this.$el.append(tickerContainer);

    const quoteTicker = new QuoteTicker({
      el: tickerContainer,
      model: {
        symbol: "SUPER",
        price: 87.30
      }
    });
    quoteTicker.render();

    return this;
  }
});

export default ApplicationView;
