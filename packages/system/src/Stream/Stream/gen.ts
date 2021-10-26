// ets_tracing: off

import * as L from "../../Collections/Immutable/List"
import type * as E from "../../Either"
import { NoSuchElementException, PrematureGeneratorExit } from "../../GlobalExceptions"
import type * as H from "../../Has"
import type * as O from "../../Option"
import type * as Utils from "../../Utils"
import { isEither, isOption, isTag } from "../../Utils"
import * as T from "../_internal/effect"
import { _A, _E, _R } from "../_internal/effect"
import { chain_ } from "./chain"
import { Stream } from "./definitions"
import { fail } from "./fail"
import { fromEffect } from "./fromEffect"
import { succeed } from "./succeed"
import { suspend } from "./suspend"

export class GenStream<R, E, A> {
  readonly [_R]!: (_R: R) => void;
  readonly [_E]!: () => E;
  readonly [_A]!: () => A
  constructor(readonly effect: () => Stream<R, E, A>) {}
  *[Symbol.iterator](): Generator<GenStream<R, E, A>, A, any> {
    return yield this
  }
}

const adapter = (_: any, __?: any) => {
  return new GenStream(() => {
    const x = _()
    if (isOption(x)) {
      return x._tag === "None"
        ? fail(__ ? __() : new NoSuchElementException())
        : succeed(x.value)
    } else if (isEither(x)) {
      return fromEffect(T.fromEither(() => x))
    } else if (x instanceof Stream) {
      return x
    } else if (isTag(x)) {
      return fromEffect(T.service(x))
    }
    return fromEffect(x)
  })
}

export function gen<RBase, EBase, AEff>(): <Eff extends GenStream<RBase, EBase, any>>(
  f: (i: {
    <A extends H.AnyService>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>
  }) => Generator<Eff, AEff, any>
) => Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>
export function gen<EBase, AEff>(): <Eff extends GenStream<any, EBase, any>>(
  f: (i: {
    <A extends H.AnyService>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>
  }) => Generator<Eff, AEff, any>
) => Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>
export function gen<AEff>(): <Eff extends GenStream<any, any, any>>(
  f: (i: {
    <A extends H.AnyService>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>
  }) => Generator<Eff, AEff, any>
) => Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>
export function gen<Eff extends GenStream<any, any, any>, AEff>(
  f: (i: {
    <A extends H.AnyService>(_: () => H.Tag<A>): GenStream<H.Has<A>, never, A>
    <E, A>(_: () => O.Option<A>, onNone: () => E): GenStream<unknown, E, A>
    <A>(_: () => O.Option<A>): GenStream<unknown, NoSuchElementException, A>
    <E, A>(_: () => E.Either<E, A>): GenStream<unknown, E, A>
    <R, E, A>(_: () => T.Effect<R, E, A>): GenStream<R, E, A>
    <R, E, A>(_: () => Stream<R, E, A>): GenStream<R, E, A>
  }) => Generator<Eff, AEff, any>
): Stream<Utils._R<Eff>, Utils._E<Eff>, AEff>
export function gen(...args: any[]): any {
  function gen_<Eff extends GenStream<any, any, any>, AEff>(
    f: (i: any) => Generator<Eff, AEff, any>
  ): Stream<Utils._R<Eff>, Utils._E<Eff>, AEff> {
    return suspend(() => {
      function run(replayStack: L.List<any>): Stream<any, any, AEff> {
        const iterator = f(adapter as any)
        let state = iterator.next()
        for (const a of replayStack) {
          if (state.done) {
            return fromEffect(T.die(new PrematureGeneratorExit()))
          }
          state = iterator.next(a)
        }
        if (state.done) {
          return succeed(state.value)
        }
        return chain_(state.value["effect"](), (val) => {
          return run(L.append_(replayStack, val))
        })
      }
      return run(L.empty())
    })
  }

  if (args.length === 0) {
    return (f: any) => gen_(f)
  }
  return gen_(args[0])
}
