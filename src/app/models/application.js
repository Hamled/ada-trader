import Backbone from 'backbone';

const Application = Backbone.Model.extend({
  // This model represents the overall application.

  // It should have attributes for holding each of
  // the individual pieces that the application is
  // composed of.
  quotes: [
    {
      symbol: "SUPER",
      price: 87.30
    },
    {
      symbol: "MIDDLE",
      price: 77.10
    }
  ]
});

export default Application;
