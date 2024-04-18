// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from "./test-utils";

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number, ClassA] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>;
    type cases = [
      Expect<IsAny<PropsType["propA"]>>,
      Expect<Equal<PropsType["propB"], string>>,
      Expect<Equal<PropsType["propC"], boolean>>,
      Expect<Equal<PropsType["propD"], ClassA>>,
      Expect<Equal<PropsType["propE"], string | number | ClassA>>,
      Expect<Equal<PropsType["propF"], RegExp>>
    ];

    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const propE = this.propE;
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number | ClassA>>
      ];
    },
  },
});

// ============= Your Code Here =============
type GetComputed<C> = C extends Record<string, () => any>
  ? {
      [K in keyof C]: ReturnType<C[K]>;
    }
  : never;

type BuildInConstructor<T> = (value?: T) => T;

interface Constructor<T> {
  new (...args: any): T;
}

type ToTsType<T> = T extends BuildInConstructor<infer R>
  ? R
  : T extends Constructor<infer R>
  ? R
  : never;

type GetPropValueType<T> = T extends { type: infer S }
  ? GetPropValueType<S>
  : T extends (infer S)[]
  ? ToTsType<S>
  : ToTsType<T>;

type GetProps<P> = {
  [K in keyof P]: keyof P[K] extends never ? any : GetPropValueType<P[K]>;
};

declare function VueBasicProps<D, C, M, P, GP = GetProps<P>>(
  options: {
    data: (this: GP) => D;
    computed: C;
    methods: M;
    props: P;
  } & ThisType<D & GetComputed<C> & M & GP>
): any;
