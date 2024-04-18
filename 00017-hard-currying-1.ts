// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
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
const curried3 = Currying(() => true);
const curried4 = Currying((a: number) => true);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>,
  Expect<Equal<typeof curried4, (a: number) => true>>
];

// ============= Your Code Here =============
declare function Currying<F>(
  f: F
): F extends (...args: infer T) => infer R
  ? T extends [infer A, ...infer B]
    ? (
        a: A
      ) => B extends [] ? R : ReturnType<typeof Currying<(...args: B) => R>>
    : (...args: T) => R
  : never;
