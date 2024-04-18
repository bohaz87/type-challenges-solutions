// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 1>, [[1], [2], [3], [4]]>>,
  Expect<
    Equal<Chunk<[1, 2, 3, 4, 5, 6, 7, 8], 2>, [[1, 2], [3, 4], [5, 6], [7, 8]]>
  >,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

// ============= Your Code Here =============
type Move<A extends any[], B extends any[], N> = B["length"] extends 0
  ? [A]
  : A["length"] extends N
  ? [A, ...Move<[], B, N>]
  : B extends [infer Head, ...infer Tail]
  ? Move<[...A, Head], Tail, N>
  : never;

type Chunk<T extends any[], N extends number> = T extends [infer A, ...infer B]
  ? Move<[A], B, N>
  : [];

type a = Chunk<[1], 1>;
type b = Chunk<[1, 2], 1>;

type c = [1] extends [...infer A, infer B, infer C] ? true : false;
