import { UnionToIntersection } from "./test-utils";
// ============= Test Cases =============
import { EnumDeclaration } from "typescript";
import type { Equal, Expect } from "./test-utils";

// + Primitive types
type Type1 = JSONSchema2TS<{
  type: "string";
}>;
type Expected1 = string;
type Result1 = Expect<Equal<Type1, Expected1>>;

type Type2 = JSONSchema2TS<{
  type: "number";
}>;
type Expected2 = number;
type Result2 = Expect<Equal<Type2, Expected2>>;

type Type3 = JSONSchema2TS<{
  type: "boolean";
}>;
type Expected3 = boolean;
type Result3 = Expect<Equal<Type3, Expected3>>;
// - Primitive types

// + Enums
type Type4 = JSONSchema2TS<{
  type: "string";
  enum: ["a", "b", "c"];
}>;
type Expected4 = "a" | "b" | "c";
type Result4 = Expect<Equal<Type4, Expected4>>;

type Type5 = JSONSchema2TS<{
  type: "number";
  enum: [1, 2, 3];
}>;
type Expected5 = 1 | 2 | 3;
type Result5 = Expect<Equal<Type5, Expected5>>;
// - Enums

// + Object types
type Type6 = JSONSchema2TS<{
  type: "object";
}>;
type Expected6 = Record<string, unknown>;
type Result6 = Expect<Equal<Type6, Expected6>>;

type Type7 = JSONSchema2TS<{
  type: "object";
  properties: {};
}>;
type Expected7 = {};
type Result7 = Expect<Equal<Type7, Expected7>>;

type Type8 = JSONSchema2TS<{
  type: "object";
  properties: {
    a: {
      type: "string";
    };
  };
}>;
type Expected8 = {
  a?: string;
};
type Result8 = Expect<Equal<Type8, Expected8>>;
// - Object types

// + Arrays
type Type9 = JSONSchema2TS<{
  type: "array";
}>;
type Expected9 = unknown[];
type Result9 = Expect<Equal<Type9, Expected9>>;

type Type10 = JSONSchema2TS<{
  type: "array";
  items: {
    type: "string";
  };
}>;
type Expected10 = string[];
type Result10 = Expect<Equal<Type10, Expected10>>;

type Type11 = JSONSchema2TS<{
  type: "array";
  items: {
    type: "object";
  };
}>;
type Expected11 = Record<string, unknown>[];
type Result11 = Expect<Equal<Type11, Expected11>>;
// - Arrays

// + Mixed types
type Type12 = JSONSchema2TS<{
  type: "object";
  properties: {
    a: {
      type: "string";
      enum: ["a", "b", "c"];
    };
    b: {
      type: "number";
    };
  };
}>;
type Expected12 = {
  a?: "a" | "b" | "c";
  b?: number;
};
type Result12 = Expect<Equal<Type12, Expected12>>;

type Type13 = JSONSchema2TS<{
  type: "array";
  items: {
    type: "object";
    properties: {
      a: {
        type: "string";
      };
    };
  };
}>;
type Expected13 = {
  a?: string;
}[];
type Result13 = Expect<Equal<Type13, Expected13>>;
// - Mixed types

// + Required fields
type Type14 = JSONSchema2TS<{
  type: "object";
  properties: {
    req1: { type: "string" };
    req2: {
      type: "object";
      properties: {
        a: {
          type: "number";
        };
      };
      required: ["a"];
    };
    add1: { type: "string" };
    add2: {
      type: "array";
      items: {
        type: "number";
      };
    };
  };
  required: ["req1", "req2"];
}>;
type Expected14 = {
  req1: string;
  req2: { a: number };
  add1?: string;
  add2?: number[];
};
type Result14 = Expect<Equal<Type14, Expected14>>;
// - Required fields

type Errors = [
  JSONSchema2TS<// @ts-expect-error
  {
    type: "string";
    enum: ["a", "b", "c", 1];
  }>,
  JSONSchema2TS<// @ts-expect-error
  {
    type: "unknown";
  }>,
  JSONSchema2TS<{
    type: "object";
    properties: { a: { type: "string" } };
    required: ["a", "bad_key"];
  }>
];

// ============= Your Code Here =============
type PrimaryTypeMapping = {
  string: string;
  number: number;
  boolean: boolean;
};

type PrimarySchema = keyof PrimaryTypeMapping extends infer PT
  ? PT extends keyof PrimaryTypeMapping
    ? {
        type: PT;
        enum?: readonly PrimaryTypeMapping[PT][];
      }
    : never
  : never;

type ObjectSchema = {
  type: "object";
  properties?: Record<string, AnySchema>;
  required?: string[];
};

interface ArraySchema {
  type: "array";
  items?: AnySchema;
}

type AnySchema = PrimarySchema | ObjectSchema | ArraySchema;

type GetTypeFromPrimarySchema<T extends PrimarySchema> = T extends Required<Pick<PrimarySchema, "enum">>
  ? T["enum"][number]
  : PrimaryTypeMapping[T["type"]];

type GetTypeFromObjectSchema<T extends ObjectSchema> = T extends Required<Pick<ObjectSchema, "properties">>
  ? T["properties"] extends infer R extends Record<string, AnySchema>
    ? MakeRequired<
        {
          [K in keyof R]?: JSONSchema2TS<R[K]>;
        },
        T["required"]
      >
    : never
  : Record<string, unknown>;

type MakeRequired<T, R extends undefined | (keyof T)[]> = [R] extends [unknown[]]
  ? Omit<T, R[number]> & Required<Pick<T, R[number]>> extends infer X
    ? {
        [K in keyof X as K extends keyof T ? K : never]: X[K];
      }
    : never
  : T;

type GetTypeFromArraySchema<T extends ArraySchema> = T extends Required<Pick<ArraySchema, "items">>
  ? JSONSchema2TS<T["items"]>[]
  : unknown[];

type JSONSchema2TS<T extends AnySchema> = T extends PrimarySchema
  ? GetTypeFromPrimarySchema<T>
  : T extends ObjectSchema
  ? GetTypeFromObjectSchema<T>
  : T extends ArraySchema
  ? GetTypeFromArraySchema<T>
  : never;
