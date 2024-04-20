// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>
];

// ============= Your Code Here =============

type Maximum<T extends any[]> = T extends [infer A, ...infer R] ? A : never;

function max<T extends number[]>(...args: T) {
  return Math.max(...args) as Maximum<T>;
}

var x = max(1, 2, 3);
