import { validateSolidityTypeInstance } from '../utils';
import { SolidityType } from '../constants';
import JSBI from 'jsbi';
/**
 * A currency is any fungible financial instrument on BINANCE, including BINANCE and all BEP20 tokens.
 *
 * The only instance of the base class `Currency` is BINANCE.
 */
export class Currency {
  public readonly decimals: number;
  public readonly symbol?: string;
  public readonly name?: string;

  /**
   * The only instance of the base class `Currency`.
   */
  public static readonly BINANCE: Currency = new Currency(18, 'BNB', 'Binance');

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.BINANCE`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);

    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
  };
};

const BINANCE = Currency.BINANCE;
export { BINANCE }
