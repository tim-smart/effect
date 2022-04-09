export const FiberRefSym = Symbol.for("@effect/core/io/FiberRef");
export type FiberRefSym = typeof FiberRefSym;

export const _A = Symbol.for("@effect/core/io/FiberRef/A");
export type _A = typeof _A;

/**
 * A `FiberRef` is Effect-TS's equivalent of Java's `ThreadLocal`. The value of a
 * `FiberRef` is automatically propagated to child fibers when they are forked
 * and merged back in to the value of the parent fiber after they are joined.
 *
 * By default the value of the child fiber will replace the value of the parent
 * fiber on join but you can specify your own logic for how values should be
 * merged.
 *
 * @tsplus type ets/FiberRef
 */
export interface FiberRef<A> {
  readonly [FiberRefSym]: FiberRefSym;
  readonly [_A]: () => A;
}

/**
 * @tsplus type ets/FiberRef/Ops
 */
export interface FiberRefOps {
  $: FiberRefAspects;
}
export const FiberRef: FiberRefOps = {
  $: {}
};

/**
 * @tsplus type ets/FiberRef/Aspects
 */
export interface FiberRefAspects {}