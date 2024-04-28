import { MergeInsertions } from "./test-utils";
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<CheckRepeatedChars<"abc">, false>>,
  Expect<Equal<CheckRepeatedChars<"abb">, true>>,
  Expect<Equal<CheckRepeatedChars<"cbc">, true>>,
  Expect<Equal<CheckRepeatedChars<"">, false>>
];

// ============= Your Code Here =============
type CheckRepeatedChars<T extends string, U = never> = T extends `${infer A}${infer B}`
  ? A extends U
    ? true
    : CheckRepeatedChars<B, U | A>
  : false;
