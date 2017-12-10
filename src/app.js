import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import OrderList from 'collections/order_list';

import QuoteListView from 'views/quote_list_view';
import TradeHistoryView from 'views/trade_history_view';
import OrderListView from 'views/order_list_view';

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
  });

  quotesView.render();

  const tradeHistory = new TradeHistoryView({
    el: $('#trades'),
    quotes: quotes,
  });

  const ordersView = new OrderListView({
    model: new OrderList(),
    el: $('#order-workspace'),
    quotes: quotes,
  });

  ordersView.render();

  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();
});
