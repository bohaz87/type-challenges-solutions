// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>
];

// ============= Your Code Here =============

type MaxTwo<A extends number, B extends number, C extends unknown[] = []> = C["length"] extends A
  ? B
  : C["length"] extends B
  ? A
  : MaxTwo<A, B, [...C, 1]>;
type a = MaxTwo<11, 22>;

type Maximum<T extends number[]> = T extends [
  infer A extends number,
  infer B extends number,
  ...infer R extends number[]
]
  ? R extends []
    ? MaxTwo<A, B>
    : Maximum<[MaxTwo<A, B>, ...R]>
  : never;
