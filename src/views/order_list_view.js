import Backbone from 'backbone';
import OrderView from 'views/order_view';
import Order from 'models/order';

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

    this._createOrder(this._formData(), true);
  },

  onSellOrder(e) {
    e.preventDefault();

    this._createOrder(this._formData(), false);
  },

  _createOrder(form, buy) {
    const quote = this.quotes.findWhere({ symbol: form.symbol });

    const order = new Order({
      quote,
      targetPrice: form.targetPrice,
      buy,
    });

    const $errors = this.$('.form-errors');
    $errors.empty();

    if(!order.isValid()) {
      order.validationError.forEach((error) => {
        $errors.append(`<h3>${error}</h3>`);
      });

      order.destroy();
      return;
    }

    this.model.add(order);
  },

  _formData() {
    return {
      symbol: this.$('select[name="symbol"]').val(),
      targetPrice: Number.parseFloat(this.$('input[name="price-target"]').val()),
    };
  },
});

export default OrderListView;
