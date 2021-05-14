import { Token, WBNB, ChainId, Pair, TokenAmount, Route, BINANCE } from '../src'

describe('Route', () => {
  const token0 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000002', 18, 't1')
  const wbnb = WBNB[ChainId.MAINNET]
  const pair_0_1 = new Pair(new TokenAmount(token0, '100'), new TokenAmount(token1, '200'))
  const pair_0_wbnb = new Pair(new TokenAmount(token0, '100'), new TokenAmount(wbnb, '100'))
  const pair_1_wbnb = new Pair(new TokenAmount(token1, '175'), new TokenAmount(wbnb, '100'))

  it('constructs a path from the tokens', () => {
    const route = new Route([pair_0_1], token0)
    expect(route.pairs).toEqual([pair_0_1])
    expect(route.path).toEqual([token0, token1])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(token1)
    expect(route.chainId).toEqual(ChainId.MAINNET)
  })

  it('can have a token as both input and output', () => {
    const route = new Route([pair_0_wbnb, pair_0_1, pair_1_wbnb], wbnb)
    expect(route.pairs).toEqual([pair_0_wbnb, pair_0_1, pair_1_wbnb])
    expect(route.input).toEqual(wbnb)
    expect(route.output).toEqual(wbnb)
  })

  it('supports binance input', () => {
    const route = new Route([pair_0_wbnb], BINANCE)
    expect(route.pairs).toEqual([pair_0_wbnb])
    expect(route.input).toEqual(BINANCE)
    expect(route.output).toEqual(token0)
  })

  it('supports binance output', () => {
    const route = new Route([pair_0_wbnb], token0, BINANCE)
    expect(route.pairs).toEqual([pair_0_wbnb])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(BINANCE)
  })
})
