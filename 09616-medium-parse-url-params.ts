// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ParseUrlParams<"">, never>>,
  Expect<Equal<ParseUrlParams<":id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user">, "id" | "user">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user/like">, "id" | "user">>
];

// ============= Your Code Here =============
type Split<S extends string> = S extends `${infer A}/${infer B}`
  ? A extends `:${infer C}`
    ? [C, ...Split<B>]
    : Split<B>
  : S extends `:${infer C}`
  ? [C]
  : [];

type ParseUrlParams<S extends string> = Split<S>[number];
