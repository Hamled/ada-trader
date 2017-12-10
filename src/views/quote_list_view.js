import Backbone from 'backbone';
import QuoteView from 'views/quote_view';

const QuoteListView = Backbone.View.extend({
  render() {
    this.$el.empty();

    this.model.forEach((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        tagName: 'li',
        className: 'quote',
      });

      this.$el.append(quoteView.render().$el);
    });

    return this;
  },
});

export default QuoteListView;
