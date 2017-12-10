import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';

import QuoteListView from 'views/quote_list_view';
import TradeHistoryView from 'views/trade_history_view';

const quoteData = [
  {
    symbol: 'HUMOR',
    price: 88.50,
  },
  {
    symbol: 'CLOTH',
    price: 81.70,
  },
  {
    symbol: 'HABIT',
    price: 98.00,
  },
  {
    symbol: 'SUPER',
    price: 83.10,
  },
];

$(document).ready(function() {
  const quotes = new QuoteList(quoteData);

  const quotesView = new QuoteListView({
    model: quotes,
    el: $('#quotes'),
    quoteTemplate: _.template($('#quote-template').html()),
  });

  quotesView.render();

  const tradeHistory = new TradeHistoryView({
    el: $('#trades'),
    quotes: quotes,
    tradeTemplate: _.template($('#trade-template').html()),
  });

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();
});
