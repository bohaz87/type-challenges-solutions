// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

// ============= Your Code Here =============
interface MyPromiseLike<R> {
  then: (onfulfilled: (value: R) => any) => any;
}

type MyAwaited<T extends Promise<any> | MyPromiseLike<any>> = T extends Promise<
  infer K
>
  ? K extends Promise<any> | MyPromiseLike<any>
    ? MyAwaited<K>
    : K
  : T extends MyPromiseLike<infer R>
  ? R extends Promise<any> | MyPromiseLike<any>
    ? MyAwaited<R>
    : R
  : T;
