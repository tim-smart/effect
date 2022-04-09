/**
 * Accesses the environment of the effect.
 *
 * @tsplus static ets/Effect/Ops environmentWith
 */
export function environmentWith<R, A>(
  f: (env: R) => A,
  __tsplusTrace?: string
): RIO<R, A> {
  return Effect.environment<R>().map(f);
}