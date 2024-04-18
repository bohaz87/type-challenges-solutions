// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============
type WithoutOne<T extends any[], K, S extends any[] = []> = T extends [
  infer H,
  ...infer R
]
  ? K extends H
    ? WithoutOne<R, K, S>
    : WithoutOne<R, K, [...S, H]>
  : S;

type Without<T extends any[], U> = U extends [infer H, ...infer R]
  ? Without<WithoutOne<T, H, []>, R>
  : WithoutOne<T, U, []>;
