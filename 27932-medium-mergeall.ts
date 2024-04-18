// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<
    Equal<
      MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
      { a: 1 | 2; b: 2; c: 3 }
    >
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>
];

// ============= Your Code Here =============

// type MergeAll<T extends any[]> = T extends [infer A, infer B, ...infer R]
//   ? MergeAll<[Merge<A, B>, ...R]>
//   : T extends [infer A]
//   ? A
//   : {};

// type Merge<A, B> = {
//   [k in keyof A | keyof B]: k extends keyof A
//     ? k extends keyof B
//       ? A[k] | B[k]
//       : A[k]
//     : k extends keyof B
//     ? B[k]
//     : never;
// };

type MergeAll<
  T extends any[],
  Values = T[number],
  Keys extends PropertyKey = Values extends infer E ? keyof E : never
> = {
  [K in Keys]: Values extends infer E ? E[K & keyof E] : never;
};
