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
});
