import type { STM } from "../definition"

/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @tsplus fluent ets/STM flipWith
 */
export function flipWith_<R, E, A, R2, E2, A2>(
  self: STM<R, E, A>,
  f: (stm: STM<R, A, E>) => STM<R2, A2, E2>
) {
  return f(self.flip()).flip()
}

/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @ets_data_first flipWith_
 */
export function flipWith<R, E, A, R2, E2, A2>(
  f: (stm: STM<R, A, E>) => STM<R2, A2, E2>
) {
  return (self: STM<R, E, A>): STM<R2, E2, A2> => self.flipWith(f)
}
