// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>,
  Expect<Equal<IsUnion<never>, false>>
  // Expect<Equal<IsUnion<(() => any) | (() => 15)>, true>>
];

// ============= Your Code Here =============
type IsUnion<T, B extends T = T> = (
  T extends T // for each type in T
    ? B extends T // check if there's only one type in B, here T means one type in T
      ? true
      : unknown
    : never
) extends true // there's only one type, not union
  ? false
  : true;

// type a = [never] extends [never] ? true : false;

// type IsUnionImpl<T, C extends T = T> = (
//   T extends T ? (C extends T ? true : unknown) : never
// ) extends true
//   ? false
//   : true;
// type IsUnion<T> = IsUnionImpl<T>;
