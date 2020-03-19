import { Hop } from '../types'

export const ibuCalculator = (
  og: number,
  volume: number,
  batch: number,
  hops: Hop[],
) => {
  let ibu = 0

  let sg = (og * 0.004 * volume) / batch

  for (let hop of hops) {
    ibu +=
      (1.65 *
        0.000125 ** sg *
        (1 - Math.exp(hop.time * -0.04)) *
        1000 *
        ((hop.alpha * hop.weight) / (100 * volume))) /
      4.15
  }

  return ibu
}

export const abvCalculator = (og: number, fg: number) => {
  let o = 1 + og / (258.6 - (og / 258.2) * 227.1)
  let f = 1 + fg / (258.6 - (fg / 258.2) * 227.1)

  const abv = ((76.08 * (o - f)) / (1.775 - o)) * (f / 0.794)

  return +abv.toFixed(2)
}
