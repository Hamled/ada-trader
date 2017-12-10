import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },

  render() {
    this.$el.html(this.template(this.model.attributes));

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
