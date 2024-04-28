// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

// ============= Your Code Here =============

type Digtals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type DigtalsString = `${Digtals[number]}`;

type ToNumber<T extends string> = `${T}` extends `${infer N extends number}` ? N : never;
type ToString<T extends number> = `${T}`;
type ToArray<T extends string, C extends string[] = []> = T extends `${infer A extends DigtalsString}${infer B}`
  ? [...C, A, ...ToArray<B>]
  : [];

type MinusByDigital<T extends DigtalsString> = ToString<[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9][ToNumber<T>]>;
type MinusByStrArray<T extends DigtalsString[]> = T extends [
  ...infer F extends DigtalsString[],
  infer D extends DigtalsString
]
  ? MinusByDigital<D> extends "-1"
    ? F extends []
      ? ["-1"]
      : [...MinusByStrArray<F>, "9"]
    : [...F, MinusByDigital<D>]
  : T extends DigtalsString
  ? [MinusByDigital<T>]
  : never;

type JoinString<T extends string[]> = T extends [infer A extends string, ...infer R extends string[]]
  ? `${A}${JoinString<R>}`
  : "";
type RemoveLeadingZero<T extends string> = T extends "0" ? T : T extends `0${infer A}` ? RemoveLeadingZero<A> : T;

type MinusOne<T extends number> = ToNumber<RemoveLeadingZero<JoinString<MinusByStrArray<ToArray<ToString<T>>>>>>;
