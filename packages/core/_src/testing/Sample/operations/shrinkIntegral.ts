/**
 * @tsplus static effect/core/testing/Sample.Ops shrinkIntegral
 */
export function shrinkIntegral(smallest: number) {
  return (a: number): Sample<never, number> =>
    Sample.unfold(a, (max) =>
      Tuple(
        max,
        Stream.unfold(smallest, (min) => {
          const mid = min + ((max - min) / 2 | 0)
          if (mid === max) {
            return Maybe.none
          } else if (Math.abs(max - mid) === 1) {
            return Maybe.some(Tuple(mid, max))
          } else {
            return Maybe.some(Tuple(mid, mid))
          }
        })
      ))
}
