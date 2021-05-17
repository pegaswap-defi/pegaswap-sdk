/**
 * A currency is any fungible financial instrument on BINANCE, including BINANCE and all BEP20 tokens.
 *
 * The only instance of the base class `Currency` is BINANCE.
 */
export declare class Currency {
    readonly decimals: number;
    readonly symbol?: string;
    readonly name?: string;
    /**
     * The only instance of the base class `Currency`.
     */
    static readonly BINANCE: Currency;
    /**
     * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.BINANCE`.
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     */
    protected constructor(decimals: number, symbol?: string, name?: string);
}
declare const BINANCE: Currency;
export { BINANCE };
