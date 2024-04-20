// ============= Test Cases =============
import type { Debug, Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ];
      }
    >
  >
];

// ============= Your Code Here =============
type Camelize<T> = {
  [K in keyof T as BuildKey<K>]: BuildValue<T[K]>;
} extends infer R
  ? { [K in keyof R]: R[K] }
  : never;

type BuildKey<K> = K extends `${infer A}_${infer B}`
  ? `${A}${BuildKey<Capitalize<B>>}`
  : K;

type BuildValue<V> = V extends any[]
  ? BuildArrayValue<V>
  : V extends Record<string, any>
  ? Camelize<V>
  : V;

type BuildArrayValue<V extends any[]> = V extends [infer A, ...infer B]
  ? [Camelize<A>, ...BuildArrayValue<B>]
  : [];

type o = Camelize<{
  some_prop: string;
  prop: { another_prop: string };
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: string } },
    { yet_another_element: string }
  ];
}>;
