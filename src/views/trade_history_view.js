import Backbone from 'backbone';
import template from 'templates/trade.html';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.listenTo(params.quotes, 'trade', this.onTrade);
  },

  onTrade(trade) {
    this.$el.prepend(template(trade));
  },

  // No render function in this view,
  // because it's not associated with any model
});

export default TradeHistoryView;
