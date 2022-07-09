/**
 * @tsplus static effect/core/testing/Sample.Ops shrinkFractional
 */
export function shrinkFractional(smallest: number) {
  return (a: number): Sample<never, number> =>
    Sample.unfold(a, (max) =>
      Tuple(
        max,
        Stream.unfold(smallest, (min) => {
          const mid = min + (max - min) / 2
          if (mid === max) {
            return Maybe.none
          } else if (Math.abs(max - mid) < 0.001) {
            return Maybe.some(Tuple(min, max))
          } else {
            return Maybe.some(Tuple(mid, mid))
          }
        })
      ))
}
