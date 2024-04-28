// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>
];

// ============= Your Code Here =============
type Arr<L extends number, R extends any[] = []> = R["length"] extends L
  ? R
  : Arr<L, [...R, 1]>;

/**
 * M => minuend, S => subtrahend
 */
type Subtract<M extends number, S extends number> = Arr<M> extends [
  ...Arr<S>,
  ...infer R extends any[]
]
  ? R["length"]
  : never;
