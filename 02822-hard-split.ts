// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Split<"Hi! How are you?">, ["Hi! How are you?"]>>,
  Expect<Equal<Split<"Hi! How are you?", "z">, ["Hi! How are you?"]>>,
  Expect<Equal<Split<"Hi! How are you?", " ">, ["Hi!", "How", "are", "you?"]>>,
  Expect<
    Equal<
      Split<"Hi! How are you?", "">,
      [
        "H",
        "i",
        "!",
        " ",
        "H",
        "o",
        "w",
        " ",
        "a",
        "r",
        "e",
        " ",
        "y",
        "o",
        "u",
        "?"
      ]
    >
  >,
  Expect<Equal<Split<"", "">, []>>,
  Expect<
    Equal<Split<"The sine in cosine", "in">, ["The s", "e ", " cos", "e"]>
  >,
  Expect<
    Equal<
      Split<"Never say never, forever and ever.", "ver">,
      ["Ne", " say ne", ", fore", " and e", "."]
    >
  >,
  Expect<Equal<Split<"", "z">, [""]>>,
  Expect<Equal<Split<"">, [""]>>,
  Expect<Equal<Split<string, "whatever">, string[]>>
];

// ============= Your Code Here =============
type Split<
  S extends string,
  SEP extends string | unknown = unknown,
  C extends string[] = []
> = unknown extends SEP
  ? [S]
  : string extends S
  ? string[]
  : SEP extends string
  ? SEP extends S
    ? S extends ""
      ? []
      : [S]
    : S extends `${infer A}${SEP}${infer B}`
    ? B extends ""
      ? [...C, A]
      : [...C, A, ...Split<B, SEP>]
    : [S]
  : never;

type a = Split<"", "">;
