// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];

// ============= Your Code Here =============
type Expand<A> = [A extends infer x ? [x, A] : never]

type e = Expand<'A'|'B'|'C'>;

type Remove<A, B> = A extends infer x ? (x extends B ? never : x) : never;

type Permutation<T, R = T, Z = T> = T extends infer A
  ? R extends A
    ? [A]
    : [A, ...Permutation<Remove<Z, A>>]
  : never;

type D = Remove<"A" | "B" | "C", "D">;
type a = Permutation<"A">;
type b = Permutation<"A" | "B">;
type c = Permutation<"A" | "B" | "C">;
