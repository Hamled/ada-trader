import _ from 'underscore';
import Backbone from 'backbone';
import Quote from 'app/models/quote';

const Application = Backbone.Model.extend({
  // This model represents the overall application.

  // It should have attributes for holding each of
  // the individual pieces that the application is
  // composed of.
  quotesData: [
    {
      symbol: "SUPER",
      price: 87.30
    },
    {
      symbol: "MIDDLE",
      price: 77.10
    }
  ],

  initialize: function() {
    this.set("quotes", _.map(this.quotesData, function(data) {
      return new Quote(data);
    }));
  }
});

export default Application;
