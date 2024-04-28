// ============= Test Cases =============
import { GenericType } from "typescript";
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Parse<`
      {
        "a": "b", 
        "b": false, 
        "c": [true, false, "hello", {
          "a": "b", 
          "b": false
        }], 
        "nil": null
      }
    `>,
      {
        nil: null;
        c: [
          true,
          false,
          "hello",
          {
            a: "b";
            b: false;
          }
        ];
        b: false;
        a: "b";
      }
    >
  >,
  Expect<Equal<Parse<"{}">, {}>>,

  Expect<Equal<Parse<"[]">, []>>,

  Expect<Equal<Parse<"[1]">, never>>,

  Expect<Equal<Parse<"true">, true>>,

  Expect<Equal<Parse<'["Hello", true, false, null]'>, ["Hello", true, false, null]>>,

  Expect<Equal<Parse<'["Hello", {"a": true}, [false, null]]'>, ["Hello", { a: true }, [false, null]]>>,

  Expect<
    Equal<
      Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>,
      {
        "hello\r\n\b\f": "world";
      }
    >
  >,

  Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

  Expect<
    Equal<
      Parse<`{ "hello
  
  world": 123 }`>,
      never
    >
  >
];

// ============= Your Code Here =============
type Pure<T> = {
  [P in keyof T]: T[P] extends object ? Pure<T[P]> : T[P];
};

type SetProperty<T, K extends PropertyKey, V> = {
  [P in keyof T | K]: P extends K ? V : P extends keyof T ? T[P] : never;
};

type Splitter = '"' | "[" | "]" | "'" | "{" | "}" | ":" | "," | "\n";

type Token<V extends string = string> = V; //{ type: T; value: V };

type Tokenize<T extends string, S extends Token[] = [], P extends string = ""> = T extends `${infer A}${infer R}`
  ? A extends Splitter
    ? Tokenize<R, Push<S, [P, A]>>
    : Tokenize<R, S, `${P}${A extends " " ? "" : A}`>
  : `${P}${T}` extends ""
  ? S
  : [...S, Token<`${P}${T}`>];

type _Parse<T extends Token[]> = First<T> extends infer F
  ? F extends "{"
    ? ParseObject<T>
    : F extends "["
    ? ParseArray<T>
    : F extends '"'
    ? ParseString<T>
    : F extends "true" | "false"
    ? ParseBoolean<T>
    : F extends `${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}${string}`
    ? ParseNumber<T>
    : F extends "null"
    ? ParsedResult<null, SafeShift<T, "null">>
    : F extends "undefined"
    ? ParsedResult<undefined, SafeShift<T, "undefined">>
    : never
  : never;

type ParsedResult<Result, RestTokens extends Token[]> = [Result, RestTokens];

type ParseObject<T extends Token[]> = ParseKeyValuePairs<Shift<T, "{">>;

type ParseKeyValuePairs<T extends Token[]> = First<T> extends "}"
  ? ParsedResult<{}, SafeShift<T, "}">>
  : ParseOneKeyValue<T> extends infer R
  ? R extends ParsedResult<infer V, infer RT>
    ? (
        First<RT> extends ","
          ? ParseKeyValuePairs<SafeShift<RT, ",">>
          : First<RT> extends "}"
          ? ParsedResult<{}, SafeShift<RT, "}">>
          : never
      ) extends [infer V2, infer RT2]
      ? [V & V2, RT2]
      : never
    : never
  : never;

type ParseOneKeyValue<T> = ParseString<T> extends infer R
  ? R extends ParsedResult<infer Key, infer RT>
    ? Key extends string
      ? First<RT> extends ":"
        ? ParseValue<SafeShift<RT, ":">> extends infer R
          ? R extends [infer Value, infer RT2 extends Token[]]
            ? ParsedResult<{ [K in Key]: Value }, RT2>
            : never
          : never
        : never
      : never
    : never
  : never;

type ParseArray<T extends Token[]> = ParseArrayItems<SafeShift<T, "[">>;

type ParseArrayItems<T extends Token[], C extends any[] = []> = First<T> extends "]"
  ? ParsedResult<[], SafeShift<T, "]">>
  : ParseValue<T> extends infer R
  ? R extends ParsedResult<infer V, infer RT>
    ? First<RT> extends "]"
      ? ParsedResult<[...C, V], SafeShift<RT, "]">>
      : First<RT> extends ","
      ? ParseArrayItems<SafeShift<RT, ",">, [...C, V]>
      : never
    : never
  : never;

type ParseValue<T extends Token[]> = _Parse<T>;

type ParseString<T> = T extends ['"', infer Value extends Token, '"', ...infer R extends Token[]]
  ? ParsedResult<FormatString<Value>, R>
  : T extends ['"', '"', ...infer R extends Token[]]
  ? ParsedResult<"", R>
  : never;

type ParseBoolean<T extends Token[]> = T extends ["true", ...infer R extends Token[]]
  ? ParsedResult<true, R>
  : T extends ["false", ...infer R extends Token[]]
  ? ParsedResult<false, R>
  : never;

type ToNumber<T, C extends any[] = []> = `${C["length"]}` extends T ? C["length"] : ToNumber<T, [...C, ""]>;

type ParseNumber<T> = T extends [infer F, ...infer R] ? [ToNumber<F>, R] : never;

type FormatString<T extends string> = T extends `${infer A}${infer B}${infer R}`
  ? `${A}${B}` extends "\\r"
    ? `\r${FormatString<R>}`
    : `${A}${B}` extends "\\n"
    ? `\n${FormatString<R>}`
    : `${A}${B}` extends "\\b"
    ? `\b${FormatString<R>}`
    : `${A}${B}` extends "\\f"
    ? `\f${FormatString<R>}`
    : FormatString<`${B}${R}`> extends infer C extends string
    ? `${A}${C}`
    : never
  : T;

/**
 * Remove the first element and it must be V
 */
type Shift<T extends Token[], V extends Token> = T extends [infer F extends Token, ...infer R extends Token[]]
  ? F extends V
    ? R
    : never
  : never;

/**
 * Remove the first element and it must be V while is always true
 */
type SafeShift<T extends Token[], V extends string = ""> = T extends [infer F, ...infer R extends Token[]] ? R : never;

/**
 * Get the first Token
 */
type First<T extends Token[]> = T extends [infer F extends Token, ...infer R] ? F : never;

/**
 * Push a token in token array, '' and '\n' will be ignored
 */
type Push<T extends Token[], V extends string | string[]> = V extends []
  ? T
  : V extends [infer A extends string, ...infer B extends string[]]
  ? Push<Push<T, A>, B>
  : V extends "" | "\n"
  ? T
  : V extends string
  ? [...T, Token<V>]
  : never;

type Parse<T extends string> = Pure<_Parse<Tokenize<T>>[0]>;

type a = Parse<'["Hello", {"a": true}, [false, null]]'>;
