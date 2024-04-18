// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<BitwiseXOR<"0", "1">, "1">>,
  Expect<Equal<BitwiseXOR<"1", "1">, "0">>,
  Expect<Equal<BitwiseXOR<"10", "1">, "11">>,
  Expect<Equal<BitwiseXOR<"110", "1">, "111">>,
  Expect<Equal<BitwiseXOR<"101", "11">, "110">>
];

// ============= Your Code Here =============
type XOR<a extends string, b extends string> = a extends b ? "0" : "1";

type Revert<S extends string> = S extends `${infer A}${infer B}`
  ? `${Revert<B>}${A}`
  : "";

type _BitwiseXOR<S1 extends string, S2 extends string> = S1 extends ""
  ? S2 extends ""
    ? ""
    : S2
  : S2 extends ""
  ? S1
  : S1 extends `${infer a}${infer A}`
  ? S2 extends `${infer b}${infer B}`
    ? `${_BitwiseXOR<A, B>}${XOR<a, b>}`
    : never
  : never;

type BitwiseXOR<S1 extends string, S2 extends string> = _BitwiseXOR<
  Revert<S1>,
  Revert<S2>
>;
