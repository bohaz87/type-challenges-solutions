// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const curried1 = DynamicParamsCurrying(
  (a: string, b: number, c: boolean) => true
);
const curried2 = DynamicParamsCurrying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);

const curried1Return1 = curried1("123")(123)(true);
const curried1Return2 = curried1("123", 123)(false);
const curried1Return3 = curried1("123", 123, true);

const curried2Return1 = curried2("123")(123)(true)(false)(true)("123")(false);
const curried2Return2 = curried2("123", 123)(true, false)(true, "123")(false);
const curried2Return3 = curried2("123", 123)(true)(false)(true, "123", false);
const curried2Return4 = curried2("123", 123, true)(false, true, "123")(false);
const curried2Return5 = curried2("123", 123, true)(false)(true)("123")(false);
const curried2Return6 = curried2("123", 123, true, false)(true, "123", false);
const curried2Return7 = curried2("123", 123, true, false, true)("123", false);
const curried2Return8 = curried2("123", 123, true, false, true)("123")(false);
const curried2Return9 = curried2("123", 123, true, false, true, "123")(false);
const curried2Return10 = curried2("123", 123, true, false, true, "123", false);

type cases = [
  Expect<Equal<typeof curried1Return1, boolean>>,
  Expect<Equal<typeof curried1Return2, boolean>>,
  Expect<Equal<typeof curried1Return3, boolean>>,

  Expect<Equal<typeof curried2Return1, boolean>>,
  Expect<Equal<typeof curried2Return2, boolean>>,
  Expect<Equal<typeof curried2Return3, boolean>>,
  Expect<Equal<typeof curried2Return4, boolean>>,
  Expect<Equal<typeof curried2Return5, boolean>>,
  Expect<Equal<typeof curried2Return6, boolean>>,
  Expect<Equal<typeof curried2Return7, boolean>>,
  Expect<Equal<typeof curried2Return8, boolean>>,
  Expect<Equal<typeof curried2Return9, boolean>>,
  Expect<Equal<typeof curried2Return10, boolean>>
];

// ============= Your Code Here =============
type BuildParamPairs<T, Head extends any[] = []> = T extends [
  ...Head,
  infer A,
  ...infer B
]
  ? B extends []
    ? [[[...Head, A], []]]
    : [[[...Head, A], B], ...BuildParamPairs<T, [...Head, A]>]
  : never;

type a = BuildParamPairs<["a", "b", "c"]>;

type MakeAll<U extends any[], R> = U extends [
  [infer A extends any[], infer B extends any[]],
  ...infer Rest extends any[]
]
  ? Rest extends []
    ? MakeOne<A, B, R>
    : MakeOne<A, B, R> & MakeAll<Rest, R>
  : never;

type MakeOne<A extends any[], B extends any[], R> = B extends []
  ? (...args: A) => R
  : (...args: A) => MakeAll<BuildParamPairs<B>, R>;

type Curried<T extends any[], R> = MakeAll<BuildParamPairs<T>, R>;

declare function DynamicParamsCurrying<T extends any[], R>(
  fn: (...args: T) => R
): Curried<T, R>;
