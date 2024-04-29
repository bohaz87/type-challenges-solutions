// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Multiply<2, 3>, "6">>,
  Expect<Equal<Multiply<3, "5">, "15">>,
  Expect<Equal<Multiply<"4", 10>, "40">>,
  Expect<Equal<Multiply<0, 16>, "0">>,
  Expect<Equal<Multiply<"13", "21">, "273">>,
  Expect<Equal<Multiply<"43423", 321543n>, "13962361689">>,
  Expect<Equal<Multiply<9999, 1>, "9999">>,
  Expect<Equal<Multiply<4325234, "39532">, "170985150488">>,
  Expect<Equal<Multiply<100_000n, "1">, "100000">>,
  Expect<Equal<Multiply<259, 9125385>, "2363474715">>,
  Expect<Equal<Multiply<9, 99>, "891">>,
  Expect<Equal<Multiply<315, "100">, "31500">>,
  Expect<Equal<Multiply<11n, 13n>, "143">>,
  Expect<Equal<Multiply<728, 0>, "0">>,
  Expect<Equal<Multiply<"0", 213>, "0">>,
  Expect<Equal<Multiply<0, "0">, "0">>
];

// ============= Your Code Here =============
type NumberAble = string | number | bigint;
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

type Reverse<T extends NumberAble> = `${T}` extends `${infer A}${infer B}` ? `${Reverse<B>}${A}` : "";
type Join<T extends string[]> = T extends [infer A extends string, ...infer B extends string[]] ? `${A}${Join<B>}` : "";
type RemoveLeadingZero<T extends string> = T extends `0${infer S}` ? S : T;

type Both<A, B> = A extends true ? (B extends true ? true : false) : false;
type Any<A, B> = A extends true ? true : B extends true ? true : false;

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

type Sum<A extends NumberAble, B extends NumberAble> = RemoveLeadingZero<
  Reverse<Join<SumByStr<Reverse<A>, Reverse<B>>>>
>;

type SumGroup<T extends string[], R extends string = "0"> = T extends [
  infer A extends string,
  ...infer B extends string[]
]
  ? SumGroup<B, Sum<A, R>>
  : R;

type PadEnd<S extends string | number, L extends number, R extends string[] = []> = R["length"] extends L
  ? S
  : PadEnd<`${S}0`, L, [...R, ""]>;
type SplitStr<T extends string, R extends string[] = []> = T extends `${infer A}${infer B}`
  ? SplitStr<B, [...R, A]>
  : R;
/**
 * 321543n = [3*100000 + 2*10000 + 1*1000 + 5*100+4*10 + 3*1]
 */
type SplitB<B extends string[], R extends [string, number][] = []> = B extends [
  infer X extends string,
  ...infer Y extends string[]
]
  ? SplitB<Y, [...R, [X, Y["length"]]]>
  : R;

type MultiplyDigital<A extends string, B extends Digitals, C extends string = "1", R extends string = A> = B extends "0"
  ? "0"
  : C extends B
  ? R
  : MultiplyDigital<A, B, Sum<C, 1>, Sum<A, R>>;

type Splice<T extends any[], L extends number, R extends any[] = []> = R["length"] extends L
  ? [R, T]
  : T extends [infer A, ...infer B]
  ? Splice<B, L, [...R, A]>
  : [R, []];

type Group<T extends any[], L extends number, R extends any[][] = []> = L extends 0
  ? []
  : T extends []
  ? R
  : Splice<T, L> extends [infer A extends any[], infer B extends any[]]
  ? B extends []
    ? [...R, A]
    : Group<B, L, [...R, A]>
  : never;

type MultiplyBySum<A extends string, B extends [Digitals, number][], R extends string = "0"> = B extends [
  [infer X extends Digitals, infer Y extends number],
  ...infer T extends [Digitals, number][]
]
  ? MultiplyBySum<A, T, Sum<R, MultiplyDigital<PadEnd<A, Y>, X>>>
  : R;

type GG<A extends string, G extends any[][]> = G extends [infer FG extends any[], ...infer TG extends any[][]]
  ? Sum<MultiplyBySum<A, FG>, GG<A, TG>>
  : "0";

type Multiply<A extends NumberAble, B extends NumberAble, X extends string = `${A}`, Y extends string = `${B}`> = Any<
  X extends "0" ? true : false,
  Y extends "0" ? true : false
> extends true
  ? "0"
  : X extends "1"
  ? Y
  : Y extends "1"
  ? X
  : GG<X, Group<SplitB<SplitStr<Y>>, 10>>;
