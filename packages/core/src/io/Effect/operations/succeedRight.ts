import { Either } from "../../../data/Either"
import type { UIO } from "../definition"
import { Effect } from "../definition"

/**
 * Returns an effect with the value on the right part.
 *
 * @tsplus static ets/EffectOps right
 */
export function succeedRight<A>(
  value: A,
  __tsplusTrace?: string
): UIO<Either<never, A>> {
  return Effect.succeed(Either.right(value))
}