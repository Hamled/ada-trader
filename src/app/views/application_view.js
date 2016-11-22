import _ from 'underscore';
import Backbone from 'backbone';
import QuoteTicker from 'app/views/quote_ticker';

const ApplicationView = Backbone.View.extend({
  initialize: function() {
    this.tickers = [];
    this.render();
  },

  events: {
    'click .btn-buy': 'onClickBuy',
    'click .btn-sell': 'onClickSell'
  },

  render: function() {
    var self = this;
    this.model.get("quotes").forEach(function(quote) {
      self.renderTicker(quote);
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
  },

  onClickBuy: function(e) {
    // Buy all of the stocks, increasing their price
    this.tickers.forEach(function(ticker) {
      ticker.trigger("price-change", +1.00);
    });
  },

  onClickSell: function(e) {
    // Sell all of the stocks, decreasing their price
    this.tickers.forEach(function(ticker) {
      ticker.trigger("price-change", -1.00);
    });
  }
});

export default ApplicationView;
