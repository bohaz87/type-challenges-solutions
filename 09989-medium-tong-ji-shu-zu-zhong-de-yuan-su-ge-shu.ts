// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<["1", "2", "0"]>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<["a", "b", ["c", ["d"]]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

// ============= Your Code Here =============
type ToObject<T extends unknown[], K extends Record<string, number[]> = {}> = T extends [
  infer A,
  ...infer R extends unknown[]
]
  ? [A] extends [PropertyKey]
    ? ToObject<R, Omit<K, A> & { [key in A]: key extends keyof K ? [...K[key], 1] : [1] }>
    : [A] extends [unknown[]]
    ? ToObject<R, ToObject<A, K>>
    : never
  : K;

type CountElementNumberToObject<T extends unknown[]> = ToObject<T> extends infer R extends Record<string, unknown[]>
  ? {
      [K in keyof R]: R[K]["length"];
    }
  : never;
