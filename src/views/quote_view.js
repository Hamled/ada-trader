import Backbone from 'backbone';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model, 'change', this.render);
  },

  render() {
    const content = this.template(this.model.attributes);
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
