import Backbone from 'backbone';
import template from 'templates/quote.html';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.listenTo(this.model, 'change', this.render);
  },

  render() {
    const content = template(this.model.attributes);
    this.$el.html(content);

    return this;
  },

  events: {
    'click .btn-buy': 'onBuy',
    'click .btn-sell': 'onSell',
  },

  onBuy() {
    this.model.buy();
  },

  onSell() {
    this.model.sell();
  },
});

export default QuoteView;
