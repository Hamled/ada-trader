import Backbone from 'backbone';
import Trade from 'app/models/trade';

const TradeLog = Backbone.Collection.extend({
  model: Trade
});

export default TradeLog;
