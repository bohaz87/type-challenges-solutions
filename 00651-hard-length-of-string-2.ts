// ============= Test Cases =============
import type { Equal, IsTrue } from "./test-utils";

type cases = [
  IsTrue<Equal<LengthOfString<"">, 0>>,
  IsTrue<Equal<LengthOfString<"1">, 1>>,
  IsTrue<Equal<LengthOfString<"12">, 2>>,
  IsTrue<Equal<LengthOfString<"123">, 3>>,
  IsTrue<Equal<LengthOfString<"1234">, 4>>,
  IsTrue<Equal<LengthOfString<"12345">, 5>>,
  IsTrue<Equal<LengthOfString<"123456">, 6>>,
  IsTrue<Equal<LengthOfString<"1234567">, 7>>,
  IsTrue<Equal<LengthOfString<"12345678">, 8>>,
  IsTrue<Equal<LengthOfString<"123456789">, 9>>,
  IsTrue<Equal<LengthOfString<"1234567890">, 10>>,
  IsTrue<Equal<LengthOfString<"12345678901">, 11>>,
  IsTrue<Equal<LengthOfString<"123456789012">, 12>>,
  IsTrue<Equal<LengthOfString<"1234567890123">, 13>>,
  IsTrue<Equal<LengthOfString<"12345678901234">, 14>>,
  IsTrue<Equal<LengthOfString<"123456789012345">, 15>>,
  IsTrue<Equal<LengthOfString<"1234567890123456">, 16>>,
  IsTrue<Equal<LengthOfString<"12345678901234567">, 17>>,
  IsTrue<Equal<LengthOfString<"123456789012345678">, 18>>,
  IsTrue<Equal<LengthOfString<"1234567890123456789">, 19>>,
  IsTrue<Equal<LengthOfString<"12345678901234567890">, 20>>,
  IsTrue<Equal<LengthOfString<"123456789012345678901">, 21>>,
  IsTrue<Equal<LengthOfString<"1234567890123456789012">, 22>>,
  IsTrue<Equal<LengthOfString<"12345678901234567890123">, 23>>,
  IsTrue<
    Equal<
      LengthOfString<"aaaaaaaaaaaaggggggggggggggggggggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">,
      272
    >
  >,
  IsTrue<
    Equal<
      LengthOfString<"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000">,
      999
    >
  >
];

// ============= Your Code Here =============

type SplitBy10<S extends string> = S extends ""
  ? ["", ""]
  : S extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${infer H}${infer I}${infer J}${infer K}`
  ? [`${A}${B}${C}${D}${E}${F}${G}${H}${I}${J}`, K]
  : [S, ""];

type SplitBy100<
  S extends string,
  H0 extends [string, string] = SplitBy10<S>,
  H1 extends [string, string] = SplitBy10<H0[1]>,
  H2 extends [string, string] = SplitBy10<H1[1]>,
  H3 extends [string, string] = SplitBy10<H2[1]>,
  H4 extends [string, string] = SplitBy10<H3[1]>,
  H5 extends [string, string] = SplitBy10<H4[1]>,
  H6 extends [string, string] = SplitBy10<H5[1]>,
  H7 extends [string, string] = SplitBy10<H6[1]>,
  H8 extends [string, string] = SplitBy10<H7[1]>,
  H9 extends [string, string] = SplitBy10<H8[1]>
> = [
  `${H0[0]}${H1[0]}${H2[0]}${H3[0]}${H4[0]}${H5[0]}${H6[0]}${H7[0]}${H8[0]}${H9[0]}`,
  H9[1]
];

type Arr10 = ["0", "1", "2", "3", "4", "4", "6", "7", "8", "9"];
type Arr100 = [
  ...Arr10,
  ...Arr10,
  ...Arr10,
  ...Arr10,
  ...Arr10,
  ...Arr10,
  ...Arr10,
  ...Arr10,
  ...Arr10,
  ...Arr10
];

type ToArr1<
  S extends string,
  C extends any[] = []
> = S extends `${infer A}${infer B}` ? ToArr1<B, [...C, A]> : C;

type ToArr10<S extends string> = SplitBy10<S> extends [
  infer A extends string,
  infer B extends string
]
  ? B extends ""
    ? ToArr1<A>
    : [...Arr10, ...ToArr10<B>]
  : [];

type ToArr100<S extends string> = SplitBy100<S> extends [
  infer A extends string,
  infer B extends string
]
  ? B extends ""
    ? ToArr10<A>
    : [...Arr100, ...ToArr100<B>]
  : [];

type LengthOfString<S extends string> = ToArr100<S>["length"];
