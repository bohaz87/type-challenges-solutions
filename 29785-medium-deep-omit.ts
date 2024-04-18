// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, "person">, {}>>,
  Expect<
    Equal<DeepOmit<obj, "person.name">, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, "name">, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, "person.age.value">,
      { person: { name: string; age: {} } }
    >
  >
];

// ============= Your Code Here =============
type DeepOmit<T, S extends string> = S extends `${infer A}.${infer B}`
  ? {
      [K in keyof T]: K extends A ? DeepOmit<T[K], B> : T[K];
    }
  : Omit<T, S>;
