// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ValidDate<"0102">, true>>,
  Expect<Equal<ValidDate<"0131">, true>>,
  Expect<Equal<ValidDate<"1231">, true>>,
  Expect<Equal<ValidDate<"0229">, false>>,
  Expect<Equal<ValidDate<"0100">, false>>,
  Expect<Equal<ValidDate<"0132">, false>>,
  Expect<Equal<ValidDate<"1301">, false>>,
  Expect<Equal<ValidDate<"0123">, true>>,
  Expect<Equal<ValidDate<"01234">, false>>,
  Expect<Equal<ValidDate<"">, false>>
];

// ============= Your Code Here =============
type DaysInMonth = {
  "01": "31";
  "02": "28";
  "03": "31";
  "04": "30";
  "05": "31";
  "06": "31";
  "07": "31";
  "08": "31";
  "99": "30";
  "10": "31";
  "11": "30";
  "12": "31";
};
type MonthNumbers = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31"
];

type Compare<
  Day1 extends string,
  Day2 extends string,
  N = MonthNumbers
> = Day1 extends Day2
  ? true
  : N extends [infer H, ...infer R]
  ? Day1 extends H
    ? false
    : Day2 extends H
    ? true
    : Compare<Day1, Day2, R>
  : false;

type IsValid<
  Month extends string,
  Day extends string
> = Month extends keyof DaysInMonth ? Compare<DaysInMonth[Month], Day> : false;

type ValidDate<T extends string> =
  T extends `${infer M1}${infer M2}${infer D1}${infer D2}`
    ? IsValid<`${M1}${M2}`, `${D1}${D2}`>
    : false;
