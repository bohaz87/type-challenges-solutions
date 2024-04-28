// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<DropString<"butter fly!", "">, "butter fly!">>,
  Expect<Equal<DropString<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropString<"butter fly!", "but">, "er fly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">>,
  Expect<Equal<DropString<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "tub">, "     e r f l y ! ">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

// ============= Your Code Here =============
type StringToUnion<S extends string> = S extends `${infer A}${infer B}` ? A | StringToUnion<B> : never;

type DropStringByUnion<S extends string, R extends string> = S extends `${infer H}${infer T}`
  ? `${H extends R ? "" : H}${DropStringByUnion<T, R>}`
  : S;

type DropString<S extends string, R extends string> = DropStringByUnion<S, StringToUnion<R>>;
