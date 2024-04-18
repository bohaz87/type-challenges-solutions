// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const store = defineStore({
  id: "",
  state: () => ({
    num: 0,
    str: "",
  }),
  getters: {
    stringifiedNum() {
      // @ts-expect-error
      this.num += 1;

      return this.num.toString();
    },
    parsedNum() {
      return parseInt(this.stringifiedNum);
    },
  },
  actions: {
    init() {
      this.reset();
      this.increment();
    },
    increment(step = 1) {
      this.num += step;
    },
    reset() {
      this.num = 0;

      // @ts-expect-error
      this.parsedNum = 0;

      return true;
    },
    setNum(value: number) {
      this.num = value;
    },
  },
});

// @ts-expect-error
store.nopeStateProp;
// @ts-expect-error
store.nopeGetter;
// @ts-expect-error
store.stringifiedNum();
store.init();
// @ts-expect-error
store.init(0);
store.increment();
store.increment(2);
// @ts-expect-error
store.setNum();
// @ts-expect-error
store.setNum("3");
store.setNum(3);
const r = store.reset();

type _tests = [
  Expect<Equal<typeof store.num, number>>,
  Expect<Equal<typeof store.str, string>>,
  Expect<Equal<typeof store.stringifiedNum, string>>,
  Expect<Equal<typeof store.parsedNum, number>>,
  Expect<Equal<typeof r, true>>
];

// ============= Your Code Here =============
declare function defineStore<
  ID extends string,
  State,
  Getters,
  Actions,
  SELF = { id: ID } & State & GetGetters<Getters> & Actions
>(store: {
  id: ID;
  state: (this: null) => State;
  getters: Getters & ThisType<Omit<SELF, keyof State> & Readonly<State>>;
  actions: Actions & ThisType<SELF>;
}): SELF;

type GetGetters<T> = {
  readonly [K in keyof T]: T[K] extends () => infer R ? R : never;
};
