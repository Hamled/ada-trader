import _ from 'underscore';
import Backbone from 'backbone';
import QuoteTicker from 'app/views/quote_ticker';

const ApplicationView = Backbone.View.extend({
  initialize: function() {
    this.tickers = [];
    this.render();
  },

  render: function() {
    this.renderTicker({
      symbol: "SUPER",
      price: 87.30
    });
    this.renderTicker({
      symbol: "MIDDLE",
      price: 77.10
    });

    return this;
  },

  renderTicker: function(tickerData) {
    // Create a new place for this quote ticker
    // to be attached
    const tickerContainer = Backbone.$('<div>');
    // Put it into the application view
    this.$el.append(tickerContainer);

    const quoteTicker = new QuoteTicker({
      el: tickerContainer,
      model: tickerData
    });

    this.tickers.push(quoteTicker);
    quoteTicker.render();
  }
});

export default ApplicationView;
