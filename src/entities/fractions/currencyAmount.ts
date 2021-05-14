import _Big from 'big.js';
import toFormat from 'toformat';
import invariant from 'tiny-invariant';
import { Fraction } from './fraction';
import { currencyEquals } from '../token';
import { Currency, BINANCE } from '../currency';
import { parseBigintIsh, validateSolidityTypeInstance } from '../../utils';
import { BigintIsh, Rounding, TEN, SolidityType } from '../../constants';
import JSBI from 'jsbi';

const Big = toFormat(_Big);

export class CurrencyAmount extends Fraction {
  public readonly currency: Currency;

  /**
   * Helper that calls the constructor with the BINANCE currency
   * @param amount BINANCE amount in wei
   */
  public static binance(amount: BigintIsh): CurrencyAmount {
    return new CurrencyAmount(BINANCE, amount);
  };

  // amount _must_ be raw, i.e. in the native representation
  protected constructor(currency: Currency, amount: BigintIsh) {
    const parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);

    super(parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals)));
    this.currency = currency;
  };

  public get raw(): JSBI {
    return this.numerator;
  };

  public add(other: CurrencyAmount): CurrencyAmount {
    invariant(currencyEquals(this.currency, other.currency), 'TOKEN');
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  public subtract(other: CurrencyAmount): CurrencyAmount {
    invariant(currencyEquals(this.currency, other.currency), 'TOKEN');
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  public toSignificant(
    significantDigits: number = 6,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    return super.toSignificant(significantDigits, format, rounding);
  };

  public toFixed(
    decimalPlaces: number = this.currency.decimals,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    invariant(decimalPlaces <= this.currency.decimals, 'DECIMALS');
    return super.toFixed(decimalPlaces, format, rounding);
  }

  public toExact(format: object = { groupSeparator: '' }): string {
    Big.DP = this.currency.decimals;
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  }
}
