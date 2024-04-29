// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Sum<2, 3>, "5">>,
  Expect<Equal<Sum<"13", "21">, "34">>,
  Expect<Equal<Sum<"328", 7>, "335">>,
  Expect<Equal<Sum<1_000_000_000_000n, "123">, "1000000000123">>,
  Expect<Equal<Sum<9999, 1>, "10000">>,
  Expect<Equal<Sum<4325234, "39532">, "4364766">>,
  Expect<Equal<Sum<728, 0>, "728">>,
  Expect<Equal<Sum<"0", 213>, "213">>,
  Expect<Equal<Sum<0, "0">, "0">>
];

// ============= Your Code Here =============
type SumAble = string | number | bigint;
type NumberArrays = {
  "0": [];
  "1": [""];
  "2": ["", ""];
  "3": ["", "", ""];
  "4": ["", "", "", ""];
  "5": ["", "", "", "", ""];
  "6": ["", "", "", "", "", ""];
  "7": ["", "", "", "", "", "", ""];
  "8": ["", "", "", "", "", "", "", ""];
  "9": ["", "", "", "", "", "", "", "", ""];
};

type Digitals = keyof NumberArrays;

type SumDigital<A extends Digitals, B extends Digitals, Flag extends "0" | "1" = "0"> = [
  ...NumberArrays[`${A}`],
  ...NumberArrays[`${B}`],
  ...NumberArrays[Flag]
]["length"] extends infer R extends number
  ? `${R}` extends `${infer A}${infer B}`
    ? B extends ""
      ? ["0", A]
      : [A, B]
    : never
  : never;

type Reverse<T extends SumAble> = `${T}` extends `${infer A}${infer B}` ? `${Reverse<B>}${A}` : "";
type Join<T extends string[]> = T extends [infer A extends string, ...infer B extends string[]] ? `${A}${Join<B>}` : "";
type RemoveLeadingZero<T extends string> = T extends `0${infer S}` ? S : T;

type Both<A, B> = A extends true ? (B extends true ? true : false) : false;

type SumByStr<A extends string, B extends string, Flag extends "0" | "1" = "0", R extends string[] = []> = Both<
  A extends "" ? true : false,
  B extends "" ? true : false
> extends true
  ? [...R, Flag]
  : A extends ""
  ? SumByStr<B, "", Flag, R>
  : B extends ""
  ? Flag extends "0"
    ? [...R, A]
    : SumByStr<A, "1", "0", R>
  : A extends `${infer A1 extends Digitals}${infer AR}`
  ? B extends `${infer B1 extends Digitals}${infer BR}`
    ? SumDigital<A1, B1, Flag> extends [infer S1 extends "0" | "1", infer S2 extends string]
      ? SumByStr<AR, BR, S1, [...R, S2]>
      : never
    : never
  : never;

type Sum<A extends SumAble, B extends SumAble> = RemoveLeadingZero<Reverse<Join<SumByStr<Reverse<A>, Reverse<B>>>>>;
