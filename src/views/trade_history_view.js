import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.tradeTemplate = params.tradeTemplate;

    this.listenTo(params.quotes, 'trade', this.onTrade);
  },

  onTrade(trade) {
    this.$el.prepend(this.tradeTemplate(trade));
  },

  // No render function in this view,
  // because it's not associated with any model
});

export default TradeHistoryView;
