// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"]; k2: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">, { k1: ["v1", "v2", "v3"]; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1">, { k1: ["v1", true] }>>,
  Expect<Equal<ParseQueryString<"k1&k1=v1">, { k1: [true, "v1"] }>>
];

// ============= Your Code Here =============
type SplitBy<S extends string, P extends string, C extends string[] = []> = S extends `${infer A}${P}${infer B}`
  ? [...C, A, ...SplitBy<B, P>]
  : S extends ""
  ? C
  : [...C, S];

type __Parse<T extends string[]> = T extends [...infer R extends string[], infer L extends string]
  ? Merge<
      SplitBy<L, "="> extends infer A
        ? A extends [infer Key extends string]
          ? { [K in Key]: true }
          : A extends [infer Key extends string, infer Value]
          ? { [K in Key]: Value }
          : never
        : never,
      __Parse<R>
    >
  : {};

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? A[K] extends B[K]
        ? A[K]
        : B[K] extends any[]
        ? A[K] extends B[K][number]
          ? B[K]
          : [...B[K], A[K]]
        : [B[K], A[K]]
      : A[K]
    : K extends keyof B
    ? B[K]
    : never;
};

type ParseQueryString<S extends string> = __Parse<SplitBy<S, "&">>;
