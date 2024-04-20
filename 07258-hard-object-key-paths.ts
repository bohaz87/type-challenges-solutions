// ============= Test Cases =============
import type { Equal, Expect, ExpectExtends } from "./test-utils";

const ref = {
  count: 1,
  person: {
    name: "cattchen",
    age: 22,
    books: ["book1", "book2"],
    pets: [
      {
        type: "cat",
      },
    ],
  },
};

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, "name" | "age">>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number;
        person: { name: string; age: number };
      }>,
      "refCount" | "person" | "person.name" | "person.age"
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "count">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.name">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.age">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.0">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.1">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books[0]">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books.[0]">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets.0.type">>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "notExist">, false>>,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.notExist">, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.name.">, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, ".person.name">, false>
  >,
  Expect<
    Equal<
      ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets.[0]type">,
      false
    >
  >
];

// ============= Your Code Here =============
type ObjectKeyPaths<T, PREFIX extends string = ""> = T extends any[]
  ? GetArrayKeys<T, PREFIX>
  : T extends Record<string, any>
  ? GetRecordKey<T, PREFIX>
  : never;

type GetArrayKeys<
  T extends any[],
  PREFIX extends string = ""
> = T extends (infer T)[]
  ? `${BuildKey<PREFIX, number>}` | ObjectKeyPaths<T, BuildKey<PREFIX, number>>
  : never;

type GetRecordKey<
  T extends Record<string, any>,
  PREFIX extends string = "",
  K extends keyof T = keyof T
> = K extends string | number
  ?
      | BuildKey<PREFIX, K>
      | (T[K] extends object
          ? ObjectKeyPaths<T[K], BuildKey<PREFIX, K>>
          : never)
  : never;

type BuildKey<P extends string, K extends string | number> = (
  P extends ""
    ? `${K}`
    : `${P}.${K}` | (K extends number ? `${P}.[${K}]` | `${P}[${K}]` : never)
) extends infer T extends string
  ? T extends `.${infer R}`
    ? R
    : T
  : never;
