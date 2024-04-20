// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null];

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];

// ============= Your Code Here =============
type ObjectFromEntries<T> = (
  T extends [infer key extends string, infer type]
    ? (a: { [K in key]: type }) => void
    : never
) extends (a: infer R) => void
  ? {
      [K in keyof R]: R[K];
    }
  : never;
type s = ObjectFromEntries<ModelEntries>;
