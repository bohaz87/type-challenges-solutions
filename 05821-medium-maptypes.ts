import { isNewExpression } from "typescript";
import { IsAny } from "./test-utils";
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>, { stringToNumber: number }>>,
  Expect<
    Equal<
      MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>,
      { stringToNumber: number; skipParsingMe: boolean }
    >
  >,
  Expect<
    Equal<
      MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>,
      { date: null | Date }
    >
  >,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>, { date: null | Date }>>,
  Expect<
    Equal<
      MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>,
      { fields: string[] }
    >
  >,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
  Expect<
    Equal<
      MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>,
      { name: boolean; date: string }
    >
  >
];

// ============= Your Code Here =============
type MapTypes<T, M> = {
  [K in keyof T]: (
    M extends {
      mapFrom: infer From;
      mapTo: infer To;
    }
      ? T[K] extends infer TK
        ? TK extends From
          ? To
          : never
        : never
      : never
  ) extends infer I
    ? [I] extends [never]
      ? T[K]
      : I
    : never;
};

type a = MapTypes<{ name: "a" | "b" }, { mapFrom: "a"; mapTo: "x" } | { mapFrom: number; mapTo: Date }>;

/**
 * This is the expected behavior, ExtendsNever is a distributive conditional type.
 * Conditional types distribute over unions.
 * Basically if T is a union ExtendsNever is applied to each member of the union and the result is the union of all applications
 * (ExtendsNever<'a' | 'b'> == ExtendsNever<'a' > | ExtendsNever<'b'>).
 * never is the empty union (ie a union with no members).
 * This is hinted at by its behavior in a union  'a' | never == 'a'.
 * So when distributing over never, ExtendsNever is never applied,
 * since there are no members in this union and thus the result is never.
 *
 * https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
 */
type IsNever<T> = T extends never ? true : false;
type inever = IsNever<1 & 2>;

/**
 * When conditional types act on a ****generic type****,
 * they become distributive when given a union type. For example, take the following:
 */
type s1 = "a" | "b" extends "a" ? 1 : 2;
type s2 = "a" | "b" extends infer A ? (A extends "a" ? 1 : 2) : never;
type Ext<T> = T extends "a" ? 1 : 2;
type s5 = Ext<"a" | "b">;
