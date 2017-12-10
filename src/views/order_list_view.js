import Backbone from 'backbone';
import OrderView from 'views/order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.quotes = params.quotes;
    this.orderTemplate = params.orderTemplate;

    this.listenTo(this.model, 'update', this.render);

    this.setupForm();
  },

  setupForm() {
    const $symbolSelect = this.$('.order-entry-form select[name="symbol"]');

    this.quotes.forEach((quote) => {
      const symbol = quote.get('symbol');

      $symbolSelect.append(`
        <option value="${symbol}">${symbol}</option>
      `);
    });
  },

  render() {
    const $orderList = this.$('#orders');
    $orderList.empty();

    this.model.forEach((order) => {
      const orderView = new OrderView({
        model: order,
        tagName: 'li',
        className: 'order',
        template: this.orderTemplate,
      });

      $orderList.append(orderView.render().$el);
    });

    return this;
  },

  events: {
    'click .btn-buy': 'onBuyOrder',
    'click .btn-sell': 'onSellOrder',
  },

  onBuyOrder(e) {
    e.preventDefault();

    const form = this._formData();
    const quote = this.quotes.findWhere({ symbol: form.symbol });

    this.model.add({
      quote,
      symbol: form.symbol,
      targetPrice: form.targetPrice,
      buy: true,
    });
  },

  onSellOrder(e) {
    e.preventDefault();

    const form = this._formData();
    const quote = this.quotes.findWhere({ symbol: form.symbol });

    this.model.add({
      quote,
      symbol: form.symbol,
      targetPrice: form.targetPrice,
      buy: false,
    });
  },

  _formData() {
    return {
      symbol: this.$('select[name="symbol"]').val(),
      targetPrice: Number.parseFloat(this.$('input[name="price-target"]').val()),
    };
  },
});

export default OrderListView;
