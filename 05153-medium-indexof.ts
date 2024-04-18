// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, "a"], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, "a", any], any>, 4>>,
  Expect<Equal<IndexOf<[string, "a"], "a">, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
  Expect<Equal<IndexOf<[any, never], never>, 1>>
];

// ============= Your Code Here =============
type MyEqual<A, B> = [<T>() => T extends A ? 1 : 2] extends [
  <T>() => T extends B ? 1 : 2
]
  ? true
  : false;

type IndexOf<T, U, index extends any[] = []> = T extends [infer H, ...infer R]
  ? MyEqual<H, U> extends true
    ? index["length"]
    : IndexOf<R, U, [...index, H]>
  : -1;

type S<X> = <T>() => T extends X ? 1 : 2;
type a = S<never>;
type b = S<{ a: "bb"; c?: string }>;
