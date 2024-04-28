// ============= Test Cases =============
import type { ExpectExtends, ExpectFalse, ExpectTrue } from "./test-utils";

declare const example: {
  foo: {
    bar: {
      a: string;
    };
    baz: {
      b: number;
      c: number;
    };
  };
};

type cases = [
  ExpectTrue<ExpectExtends<Path<(typeof example)["foo"]["bar"]>, ["a"]>>,
  ExpectTrue<ExpectExtends<Path<(typeof example)["foo"]["baz"]>, ["b"] | ["c"]>>,
  ExpectTrue<
    ExpectExtends<Path<(typeof example)["foo"]>, ["bar"] | ["baz"] | ["bar", "a"] | ["baz", "b"] | ["baz", "c"]>
  >,
  ExpectFalse<ExpectExtends<Path<(typeof example)["foo"]["bar"]>, ["z"]>>
];

// ============= Your Code Here =============

type _Path<T, R extends unknown[] = [], U extends keyof T = keyof T> = U extends U
  ? T[U] extends Record<string, any>
    ? [...R, U] | _Path<T[U], [...R, U]>
    : [...R, U]
  : never;

type Path<T> = _Path<T>;
