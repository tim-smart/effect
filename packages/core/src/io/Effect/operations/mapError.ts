import { failureOrCause } from "../../Cause"
import { Effect } from "../definition"

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @tsplus fluent ets/Effect mapError
 */
export function mapError_<R, E, A, E2>(
  self: Effect<R, E, A>,
  f: (e: E) => E2,
  __tsplusTrace?: string
): Effect<R, E2, A> {
  return self.foldCauseEffect(
    (c) => failureOrCause(c).fold((e) => Effect.failNow(f(e)), Effect.failCauseNow),
    Effect.succeedNow
  )
}

/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger" error.
 *
 * @ets_data_first mapError_
 */
export function mapError<E, E2>(f: (e: E) => E2, __tsplusTrace?: string) {
  return <R, A>(self: Effect<R, E, A>): Effect<R, E2, A> => self.mapError(f)
}