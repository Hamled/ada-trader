import Backbone from 'backbone';
import QuoteTicker from 'app/views/quote_ticker';

const ApplicationView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    const quoteTicker = new QuoteTicker({
      el: this.$el,
      model: {
        symbol: "SUPER",
        price: 87.30
      }
    });
    quoteTicker.render();

    return this;
  }
});

export default ApplicationView;
