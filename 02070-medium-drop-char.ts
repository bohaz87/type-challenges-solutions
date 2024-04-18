// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

// ============= Your Code Here =============
// type DropCharLeft<S extends string, C extends string> = S extends `${infer C}${infer T}` ? DropCharLeft<T, C> : S
// type DropCharRight<S extends string, C extends string> = S extends `${infer H}${infer C}` ? DropCharRight<H, C> : S
type DropChar<
  S extends string,
  C extends string
> = S extends `${infer H}${C}${infer T}` ? DropChar<`${H}${T}`, C> : S;
