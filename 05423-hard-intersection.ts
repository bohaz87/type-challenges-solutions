// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>
];

// ============= Your Code Here =============
type NumberToObject<T extends number | number[]> = {
  [K in T extends number ? T : T extends any[] ? T[number] : never]: number;
};

type ToObj<T> = T extends [
  infer A extends number | number[],
  ...infer R extends any[]
]
  ? R extends []
    ? NumberToObject<A>
    : NumberToObject<A> | ToObj<R>
  : never;

// type Intersection<T> = keyof ToObj<T>;
type Intersection<T> = T extends [infer First, ...infer Rest]
  ? (First extends unknown[] ? First[number] : First) & Intersection<Rest>
  : unknown;
