import _ from 'underscore';
import Backbone from 'backbone';

const QuoteTicker = Backbone.View.extend({
  initialize: function() {
    // Setup our compiled template function using the template code
    // from our index HTML

    const templateString = Backbone.$('#tmpl-quote-ticker').html();
    this.template = _.template(templateString);
  }
});

export default QuoteTicker;
