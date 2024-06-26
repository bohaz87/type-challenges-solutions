// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];

// ============= Your Code Here =============
// T | K === T, then K is never
// type IsNever<T> = (<K>() => T | K) extends <K>() => K ? true : false;
// https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
type IsNever<T> = [T] extends [never] ? true : false;
