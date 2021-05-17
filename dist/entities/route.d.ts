import { Pair } from './pair';
import { Price } from './fractions/price';
import { Token } from './token';
import { Currency } from './currency';
import { ChainId } from '../constants';
export declare class Route {
    readonly pairs: Pair[];
    readonly path: Token[];
    readonly input: Currency;
    readonly output: Currency;
    readonly midPrice: Price;
    constructor(pairs: Pair[], input: Currency, output?: Currency);
    get chainId(): ChainId;
}
