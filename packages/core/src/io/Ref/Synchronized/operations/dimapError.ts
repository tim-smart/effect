import { Either } from "../../../../data/Either"
import type { XSynchronized } from "../definition"

/**
 * Transforms both the `set` and `get` errors of the `XRef.Synchronized`
 * with the specified functions.
 *
 * @tsplus fluent ets/XSynchronized dimapError
 */
export function dimapError_<RA, RB, EA, EB, EC, ED, A, B>(
  self: XSynchronized<RA, RB, EA, EB, A, B>,
  f: (ea: EA) => EC,
  g: (eb: EB) => ED
): XSynchronized<RA, RB, EC, ED, A, B> {
  return self._fold(f, g, Either.right, Either.right)
}

/**
 * Transforms both the `set` and `get` errors of the `XRef.Synchronized`
 * with the specified functions.
 *
 * @ets_data_first dimapError_
 */
export function dimapError<EA, EB, EC, ED>(f: (ea: EA) => EC, g: (eb: EB) => ED) {
  return <RA, RB, A, B>(
    self: XSynchronized<RA, RB, EA, EB, A, B>
  ): XSynchronized<RA, RB, EC, ED, A, B> => self.dimapError(f, g)
}