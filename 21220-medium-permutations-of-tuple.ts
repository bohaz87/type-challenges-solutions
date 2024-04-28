// ============= Test Cases =============
import type { Equal, Expect, ExpectFalse } from "./test-utils";

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<
    Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[any, unknown, never]>,
      | [any, unknown, never]
      | [unknown, any, never]
      | [unknown, never, any]
      | [any, never, unknown]
      | [never, any, unknown]
      | [never, unknown, any]
    >
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[1, number, unknown]>,
      | [1, number, unknown]
      | [1, unknown, number]
      | [number, 1, unknown]
      | [unknown, 1, number]
      | [number, unknown, 1]
      | [unknown, number, 1]
    >
  >,
  ExpectFalse<Equal<PermutationsOfTuple<[1, number, unknown]>, [unknown]>>
];

// ============= Your Code Here =============
type PermutationsOfTuple<T extends unknown[]> = [];
type Push<A extends any[][], B> = A extends [
  infer H extends any[],
  ...infer T extends any[][]
]
  ? [[...H, B], ...Push<T, B>]
  : [];
type Permutations<A extends any[][], B> = [[...A, B], [B, ...A]];

type p = Permutations<[[1, 2], [3, 4]], "a">;
