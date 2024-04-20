import { IsTrue } from "./test-utils";
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>
];

// ============= Your Code Here =============
type NotUnion<T, K = T> = (
  T extends infer ST ? (K extends ST ? true : false) : never
) extends true
  ? true
  : false;
type IsUnion<T> = NotUnion<T> extends true ? false : true;

type IsNegativeNumber<T extends number> = IsUnion<T> extends true
  ? never
  : number extends T
  ? never
  : `${T}` extends `-${infer A}`
  ? true
  : false;
