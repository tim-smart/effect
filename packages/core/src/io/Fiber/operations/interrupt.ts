import type { UIO } from "../../Effect"
import { Effect } from "../../Effect"
import type { Exit } from "../../Exit"
import type { Fiber } from "../definition"

/**
 * Interrupts the fiber from whichever fiber is calling this method. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 *
 * @tsplus fluent ets/Fiber interrupt
 * @tsplus fluent ets/RuntimeFiber interrupt
 */
export function interrupt<E, A>(
  self: Fiber<E, A>,
  __tsplusTrace?: string
): UIO<Exit<E, A>> {
  return Effect.fiberId.flatMap((fiberId) => self.interruptAs(fiberId))
}