// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Get<Data, "hello">, "world">>,
  Expect<Equal<Get<Data, "foo.bar.count">, 6>>,
  Expect<Equal<Get<Data, "foo.bar">, { value: "foobar"; count: 6 }>>,
  Expect<Equal<Get<Data, "foo.baz">, false>>,

  Expect<Equal<Get<Data, "no.existed">, never>>
];

type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  "foo.baz": false;
  hello: "world";
};

// ============= Your Code Here =============
type Get<T extends Record<string, any>, S extends String> = S extends keyof T
  ? T[S]
  : S extends `${infer A}.${infer B}`
  ? Get<T[A], B>
  : never;
