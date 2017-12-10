import Backbone from 'backbone';
import template from 'templates/order.html';

const OrderView = Backbone.View.extend({
  render() {
    this.$el.html(template(this.model.attributes));

    return this;
  },

  events: {
    'click .btn-cancel': 'onCancel',
  },

  onCancel() {
    this.model.destroy();
  },
});

export default OrderView;
