// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>
  >
];

// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type IsZero<A extends number> = A extends 0 ? true : false;
type IsNeg<A extends number> = `${A}` extends `-${infer B}` ? true : false;
type IsPos<A extends number> = And<Not<IsZero<A>>, Not<IsNeg<A>>>;
type And<A extends boolean, B extends boolean> = true extends A & B
  ? true
  : false;
type Or<A, B> = true extends A | B ? true : false;
type Not<A extends boolean> = A extends true ? false : true;

type ToString<A extends number> = `${A}` extends `-${infer B}`
  ? [B, false]
  : [`${A}`, true];

// Compares two digits
type CompareDigits<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : "0123456789" extends `${string}${A}${string}${B}${string}`
  ? Comparison.Lower
  : Comparison.Greater;

type CompareSameLenString<
  A extends string,
  B extends string
> = `${A}|${B}` extends `${infer H1}${infer R1}|${infer H2}${infer R2}`
  ? CompareDigits<H1, H2> extends infer R
    ? R extends Comparison.Equal
      ? CompareSameLenString<R1, R2>
      : R
    : never
  : never;

type CompareString<
  A extends string,
  B extends string,
  flag = true,
  MA extends string = MappingToZero<A>,
  MB extends string = MappingToZero<B>
> = MA extends `${MB}${infer R}`
  ? R extends ""
    ? CompareSameLenString<A, B> extends infer Ret
      ? flag extends true
        ? Ret
        : Ret extends Comparison.Greater
        ? Comparison.Lower
        : Ret extends Comparison.Lower
        ? Comparison.Greater
        : Ret
      : never
    : // a.len > b.len
    flag extends true
    ? Comparison.Greater
    : Comparison.Lower
  : MB extends `${MA}${infer R}`
  ? R extends ""
    ? never // same len, should retured already
    : // a.len < b.len
    flag extends true
    ? Comparison.Lower
    : Comparison.Greater
  : never;

type MappingToZero<S extends string> = S extends `${infer A}${infer B}`
  ? `0${MappingToZero<B>}`
  : "";

type Comparator<A extends number, B extends number> = A extends B
  ? Comparison.Equal
  : Or<And<IsNeg<A>, IsNeg<B>>, And<IsPos<A>, IsPos<B>>> extends true
  ? CompareString<ToString<A>[0], ToString<B>[0], ToString<A>[1]>
  : IsPos<A> extends true
  ? Comparison.Greater
  : IsPos<B> extends true
  ? Comparison.Lower
  : IsZero<A> extends true
  ? Comparison.Greater
  : Comparison.Lower;

function compare<A extends number, B extends number>(
  a: A,
  b: B
): Comparator<A, B> {
  if (a > b) {
    // @ts-ignore
    return Comparison.Greater;
  } else if (a < b) {
    // @ts-ignore
    return Comparison.Lower;
  } else {
    // @ts-ignore
    return Comparison.Equal;
  }
}

var s = compare(0, 0);
