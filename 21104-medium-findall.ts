// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FindAll<"Collection of TypeScript type challenges", "Type">, [14]>>,
  Expect<Equal<FindAll<"Collection of TypeScript type challenges", "pe">, [16, 27]>>,
  Expect<Equal<FindAll<"Collection of TypeScript type challenges", "">, []>>,
  Expect<Equal<FindAll<"", "Type">, []>>,
  Expect<Equal<FindAll<"", "">, []>>,
  Expect<Equal<FindAll<"AAAA", "A">, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<"AAAA", "AA">, [0, 1, 2]>>
];

// ============= Your Code Here =============
type Len<T extends string, C extends unknown[] = []> = T extends `${infer A}${infer B}`
  ? Len<B, [...C, A]>
  : C["length"];

type _FindAll<
  T extends string,
  P extends string,
  R extends number[] = [],
  // leading string
  H extends string = "",
  // next leading string
  N extends string = T extends `${H}${infer A}${string}` ? `${H}${A}` : never
> = T extends H ? R : T extends `${H}${P}${string}` ? _FindAll<T, P, [...R, Len<H>], N> : _FindAll<T, P, R, N>;

type FindAll<T extends string, P extends string> = P extends "" ? [] : _FindAll<T, P>;
