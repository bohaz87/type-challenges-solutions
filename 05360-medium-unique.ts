// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, "a", 2, "b", 2, "a"]>, [1, "a", 2, "b"]>>,
  Expect<Equal<Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>, [string, number, 1, "a", 2, "b"]>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>
];

// ============= Your Code Here =============
type Includes<U extends unknown[], A> = U extends [infer B, ...infer R]
  ? Equal<A, B> extends true
    ? true
    : Includes<R, A>
  : false;

type Unique<T extends unknown[], U extends unknown[] = []> = T extends [infer A, ...infer R]
  ? Includes<U, A> extends true
    ? Unique<R, U>
    : Unique<R, [...U, A]>
  : U;
