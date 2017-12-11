import Quote from 'models/quote';

describe('Quote spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });
  });

  describe('Buy function', () => {
    it('increases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.buy();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    });

    it('fires the trade event', () => {
      const tradeHandler = jasmine.createSpy();
      quote.on('trade', tradeHandler);

      quote.buy();

      expect(tradeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sell function', () => {
    it('decreases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.sell();

      expect(quote.get('price')).toEqual(startPrice - 1.00);
    });

    it('fires the trade event', () => {
      const tradeHandler = jasmine.createSpy();
      quote.on('trade', tradeHandler);

      quote.sell();

      expect(tradeHandler).toHaveBeenCalledTimes(1);
    });
  });
});
