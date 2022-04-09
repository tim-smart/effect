import { concreteXPure } from "@effect/core/io-light/Sync/definition";

/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or right function passed to `fold`.
 *
 * @tsplus fluent ets/Sync fold
 */
export function fold_<R, E, A, B, C>(
  self: Sync<R, E, A>,
  failure: (e: E) => B,
  success: (a: A) => C
): Sync<R, never, B | C> {
  concreteXPure(self);
  return self.fold(failure, success);
}

/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or right function passed to `fold`.
 *
 * @tsplus static ets/Sync/Aspects fold
 */
export const fold = Pipeable(fold_);