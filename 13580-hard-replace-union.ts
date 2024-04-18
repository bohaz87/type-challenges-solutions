// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // string -> null
  Expect<
    Equal<
      UnionReplace<number | string, [[string, null], [Date, Function]]>,
      number | null
    >
  >,

  // Date -> string; Function -> undefined
  Expect<
    Equal<
      UnionReplace<
        Function | Date | object,
        [[Date, string], [Function, undefined]]
      >,
      undefined | string | object
    >
  >
];

// ============= Your Code Here =============
type UnionReplace<T, U extends [any, any][]> = T extends T ? Get<T, U> : never;

type Get<T, U extends [any, any][]> = U extends [
  infer A extends [any, any],
  ...infer B extends [any, any][]
]
  ? MyEqual<T, A[0]> extends true
    ? A[1]
    : Get<T, B>
  : T;

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;
