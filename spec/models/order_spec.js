import Order from 'models/order';
import Quote from 'models/quote';

describe('Order spec', () => {
  let quote;
  let buyOrder;
  let sellOrder;

  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });

    buyOrder = new Order({
      quote,
      targetPrice: 90.00,
      buy: true,
    });

    sellOrder = new Order({
      quote,
      targetPrice: 110.00,
      buy: false,
    });
  });

  describe('isValid function', () => {
    it('returns true when order is valid', () => {
      expect(buyOrder.isValid()).toEqual(true);
      expect(sellOrder.isValid()).toEqual(true);
    });

    it('returns false when order has no quote', () => {
      buyOrder.set('quote', undefined);

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when order has no symbol', () => {
      buyOrder.set('symbol', undefined);

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when order has non-matching symbol', () => {
      buyOrder.set('symbol', quote.get('symbol') + 'WORLD');

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when order has no target price', () => {
      buyOrder.set('targetPrice', undefined);

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when order has zero target price', () => {
      buyOrder.set('targetPrice', 0.00);

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when order has negative target price', () => {
      buyOrder.set('targetPrice', -1.00);

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when order has NaN target price', () => {
      buyOrder.set('targetPrice', NaN);

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when BUY order has target price >= market price', () => {
      buyOrder.set('targetPrice', quote.get('price') + 1.00);

      expect(buyOrder.isValid()).toEqual(false);
    });

    it('returns false when SELL order has target price <= market price', () => {
      sellOrder.set('targetPrice', quote.get('price') - 1.00);

      expect(sellOrder.isValid()).toEqual(false);
    });
  });

  describe('automatic order execution', () => {
    let handlers;

    beforeEach(() => {
      handlers = jasmine.createSpyObj('handlers', ['trade', 'buyDestroy', 'sellDestroy']);

      quote.on('trade', handlers.trade);
      buyOrder.on('destroy', handlers.buyDestroy);
      sellOrder.on('destroy', handlers.sellDestroy);
    });

    it('executes BUY order and destroys it when market price matches target price', () => {
      quote.set('price', buyOrder.get('targetPrice'));

      expect(handlers.trade).toHaveBeenCalled();
      expect(handlers.buyDestroy).toHaveBeenCalled();
      expect(handlers.sellDestroy).not.toHaveBeenCalled();
    });

    it('executes BUY order and destroys it when market price is better than target price', () => {
      quote.set('price', buyOrder.get('targetPrice') - 1.00);

      expect(handlers.trade).toHaveBeenCalled();
      expect(handlers.buyDestroy).toHaveBeenCalled();
      expect(handlers.sellDestroy).not.toHaveBeenCalled();
    });

    it('does NOT execute BUY order and destroys it when market price is worse than target price', () => {
      quote.set('price', buyOrder.get('targetPrice') + 1.00);

      expect(handlers.trade).not.toHaveBeenCalled();
      expect(handlers.buyDestroy).not.toHaveBeenCalled();
      expect(handlers.sellDestroy).not.toHaveBeenCalled();
    });

    it('executes SELL order and destroys it when market price matches target price', () => {
      quote.set('price', sellOrder.get('targetPrice'));

      expect(handlers.trade).toHaveBeenCalled();
      expect(handlers.sellDestroy).toHaveBeenCalled();
      expect(handlers.buyDestroy).not.toHaveBeenCalled();
    });

    it('executes SELL order and destroys it when market price is better than target price', () => {
      quote.set('price', sellOrder.get('targetPrice') + 1.00);

      expect(handlers.trade).toHaveBeenCalled();
      expect(handlers.sellDestroy).toHaveBeenCalled();
      expect(handlers.buyDestroy).not.toHaveBeenCalled();
    });

    it('does NOT execute SELL order and destroys it when market price is worse than target price', () => {
      quote.set('price', sellOrder.get('targetPrice') - 1.00);

      expect(handlers.trade).not.toHaveBeenCalled();
      expect(handlers.buyDestroy).not.toHaveBeenCalled();
      expect(handlers.sellDestroy).not.toHaveBeenCalled();
    });

    it('does NOT execute BUY orders more than once', () => {
      quote.set('price', buyOrder.get('targetPrice'));
      quote.set('price', buyOrder.get('targetPrice'));

      expect(handlers.trade).toHaveBeenCalledTimes(1);
      expect(handlers.buyDestroy).toHaveBeenCalledTimes(1);
      expect(handlers.sellDestroy).not.toHaveBeenCalled();
    });

    it('does NOT execute SELL orders more than once', () => {
      quote.set('price', sellOrder.get('targetPrice'));
      quote.set('price', sellOrder.get('targetPrice'));

      expect(handlers.trade).toHaveBeenCalledTimes(1);
      expect(handlers.sellDestroy).toHaveBeenCalledTimes(1);
      expect(handlers.buyDestroy).not.toHaveBeenCalled();
    });
  });
});
