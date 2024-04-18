// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ToNumber<"1">, 1>>,
  Expect<Equal<ToNumber<"0">, 0>>,
  Expect<Equal<ToNumber<"9">, 9>>,

  Expect<Equal<ToString<1>, "1">>,
  Expect<Equal<ToString<12340>, "12340">>,

  Expect<Equal<NumberCompare<0, 0>, 0>>,
  Expect<Equal<NumberCompare<8, 3>, 1>>,
  Expect<Equal<NumberCompare<5, 9>, -1>>,

  Expect<Equal<StrLen<"0">, 1>>,
  Expect<Equal<StrLen<"123">, 3>>,
  Expect<Equal<StrLen<"1234567890">, 10>>,

  Expect<Equal<StringCompare<"10", "9">, true>>,
  Expect<Equal<NumberCompare<StrLen<"10">, StrLen<"9">>, 1>>,

  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

// ============= Your Code Here =============
type NumMapping = {
  "0": 0;
  "1": 1;
  "2": 2;
  "3": 3;
  "4": 4;
  "5": 5;
  "6": 6;
  "7": 7;
  "8": 8;
  "9": 9;
};
type ToString<T extends number> = `${T}`;
type StrLen<S extends string, Count extends string[] = []> = S extends ""
  ? Count["length"]
  : S extends `${infer H}${infer T}`
  ? StrLen<T, [...Count, H]>
  : never;

type ThreePath<
  Value extends -1 | 0 | 1,
  A extends boolean,
  B extends boolean,
  C extends boolean
> = Value extends -1 ? A : Value extends 0 ? B : Value extends 1 ? C : never;

type NumberCompare<
  A extends number,
  B extends number,
  Count extends any[] = [],
  L extends number = Count["length"]
> = A extends B
  ? 0
  : L extends A
  ? -1
  : L extends B
  ? 1
  : NumberCompare<A, B, [...Count, 1]>;

type ToNumber<T extends string, N = NumMapping> = T extends keyof N
  ? N[T]
  : never;

type StringCompare<
  A extends string,
  B extends string,
  L1 extends number = StrLen<A>,
  L2 extends number = StrLen<B>
> = A extends B
  ? false
  : ThreePath<NumberCompare<L1, L2>, false, CompareWithSameLength<A, B>, true>;

type CompareWithSameLength<
  A extends string,
  B extends string
> = A["length"] extends 0 | 1
  ? true
  : A extends `${infer H1}${infer T1}`
  ? B extends `${infer H2}${infer T2}`
    ? ThreePath<
        NumberCompare<ToNumber<H1>, ToNumber<H2>>,
        false,
        CompareWithSameLength<T1, T2>,
        true
      >
    : never
  : never;

type GreaterThan<T extends number, U extends number> = T extends U
  ? false
  : StringCompare<ToString<T>, ToString<U>>;

type a = GreaterThan<0, 0>;
