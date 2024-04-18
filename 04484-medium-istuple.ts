// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsTuple<string>, false>>,
  Expect<Equal<IsTuple<"123">, false>>,
  Expect<Equal<IsTuple<123>, false>>,

  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<readonly []>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<[readonly [number]]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<[never]>, true>>,
  Expect<Equal<IsTuple<readonly [never]>, true>>,
  Expect<Equal<IsTuple<never>, false>>
];

// ============= Your Code Here =============
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;
