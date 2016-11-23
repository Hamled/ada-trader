import _ from 'underscore';
import Backbone from 'backbone';

const TradeHistory = Backbone.View.extend({
  initialize: function() {
    const tradeTemplateString = Backbone.$("#tmpl-trade").html();
    this.tradeTemplate = _.template(tradeTemplateString);
  }
});

export default TradeHistory;
