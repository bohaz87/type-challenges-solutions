// ============= Test Cases =============
import { ExtendedConfigCacheEntry, getAllJSDocTags } from "typescript";
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<
    Equal<
      CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">,
      "Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq"
    >
  >,
  Expect<Equal<CapitalizeWords<"">, "">>
];

// ============= Your Code Here =============
type IsSplitter<S extends string> = Uppercase<S> extends Lowercase<S>
  ? true
  : false;

type HeadOf<S extends string> = S extends `${infer A}${infer B}`
  ? IsSplitter<A> extends true
    ? A
    : `${A}${HeadOf<B>}`
  : S;

type CapitalizeWords<
  S extends string,
  A extends string = HeadOf<S>
> = S extends `${A}${infer B}`
  ? B extends ""
    ? Capitalize<A>
    : `${Capitalize<A>}${CapitalizeWords<Capitalize<B>>}`
  : S;
