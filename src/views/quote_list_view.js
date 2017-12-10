import Backbone from 'backbone';
import QuoteView from 'views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.quoteTemplate = params.quoteTemplate;
  },

  render() {
    this.$el.empty();

    this.model.forEach((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        tagName: 'li',
        className: 'quote',
        template: this.quoteTemplate,
      });

      this.$el.append(quoteView.render().$el);
    });

    return this;
  },
});

export default QuoteListView;
