export {};
/**
 * 交叉类型
 * 交叉类型(Intersection Types)是将多个类型合并为一个类型
 * 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
 */
interface Bird1 {
  name: string;
  fly(): void;
}
interface Person {
  name: string;
  talk(): void;
}
type BirdPerson = Bird1 & Person;
let p: BirdPerson = {
  name: "lee",
  fly() {},
  talk() {},
};

interface X {
  a: string;
  b: string;
}
interface Y {
  a: number;
  c: number;
}
type XY = X & Y;
// let p: XY = { a: 111, b: "123", c: 123 };

type Ta = string | number;
type Tb = number | boolean;
type Tc = Ta & Tb;
// let c1: Tc = "lee";
let c2: Tc = 1;
// let c3: Tc = true;

/**
 * mixin混入模式可以让你从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能
 */
interface AnyObj {
  [key: string]: any;
}
function mixin<T extends AnyObj, U extends AnyObj>(one: T, two: U): T & U {
  let result = <T & U>{};
  for (let i in one) {
    (result as T)[i] = one[i];
  }
  for (let i in two) {
    (result as U)[i] = two[i];
  }
  return result;
}
const x = mixin({ name: "zhufeng" }, { age: 11 });
// x.name x.age

/**
 * typeof 获取一个变量的类型
 */
let p1 = {
  name: "lee",
  age: 12,
  gender: "male",
};
type Person1 = typeof p1;
function getName(p: Person1): string {
  return p.name;
}
getName({
  name: "123",
  age: 1,
  gender: "femal",
});

/**
 * 索引访问操作符
 * 可以通过[]获取一个类型的子类型
 */
interface Person2 {
  name: string;
  age: number;
  job: {
    name: string;
  };
  arr: { name: string; age: number }[];
}
let FrontEndJob: Person2["job"] = {
  name: "lee",
};
let name: Person2["arr"][0]["name"] = "lee";

/**
 * keyof索引类型查询操作符
 */
interface Person3 {
  name: string;
  age: number;
  gender: "male" | "female";
}
type PersonKey = keyof Person3;
function getValueByKey(p: Person3, key: PersonKey) {
  return p[key];
}
let val = getValueByKey(
  {
    name: "lee",
    age: 18,
    gender: "male",
  },
  "name"
);

/**
 * 映射类型
 * 在定义的时候用in操作符去批量定义类型中的属性
 */
interface Person4 {
  name: string;
  age: number;
  gender: "male" | "female";
}
//批量把一个接口中的属性都变成可选的
type PartPerson = {
  [Key in keyof Person4]?: Person4[Key];
};
let p2: PartPerson = {};
type Part<T> = {
  [key in keyof T]?: T[key];
};
let p3: Part<Person4> = { name: "lee" };

namespace a {
  function pick<T, U extends keyof T>(o: T, keys: U[]): T[U][] {
    return keys.map((key) => o[key]);
  }
  let user = {
    name: "lee",
    age: 18,
    gender: "male",
  };
  type User = typeof user;
  pick<User, keyof User>(user, ["name", "age"]);
}

/**
 * 条件类型
 * 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
 */

/**
 * 定义条件类型
 */
interface Fish {
  fish: string;
}
interface Water {
  water: string;
}
interface Bird {
  bird: string;
}
interface Sky {
  sky: string;
}
//若 T 能够赋值给 Fish，那么类型是 Water,否则为 Sky
type Condition<T> = T extends Fish ? Water : Sky;
let condition: Condition<Bird> = {
  //condition = Sky
  sky: "lee",
};

/**
 * 条件类型的分发
 */
let condition2: Condition<Bird | Fish>; //condition2 = Water | Sky

/**
 * 条件类型有一个特性,就是「分布式有条件类型」,
 * 但是分布式有条件类型是有前提的,条件类型里待检查的类型必须是naked type parameter
 */

/**
 * 找出T类型中U不包含的部分
 */
type Diff<T, U> = T extends U ? never : T;
type R = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"

type Filter<T, U> = T extends U ? T : never;
type R1 = Filter<string | number | boolean, number>; // number

/**
 * 编写一个工具类型将interface中函数类型的名称取出来
 */
interface Person2 {
  id: number;
  name: string;
  getName(): string;
  getAge(): number;
}
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type R2 = FunctionPropertyNames<Person2>;

/**
 * 内置条件类型
 * Exclude  从 T 可分配给的类型中排除 U
 * Extract  从 T 可分配的类型中提取 U
 * NonNullable  从 T 中排除 null 和 undefined
 * ReturnType  获取函数类型的返回类型
 * Parameters  Constructs a tuple type of the types of the parameters of a function type T
 * InstanceType  获取构造函数类型的实例类型
 */
namespace b {
  type Exclude<T, U> = T extends U ? never : T;
  type E = Exclude<string | number, string>;
  let e: E = 10;
}

namespace e {
  type Extract<T, U> = T extends U ? T : never;
  type E = Extract<string | number, string>;
  let e: E = "1";
}

namespace f {
  type NonNullable<T> = T extends null | undefined ? never : T;
  type E = NonNullable<string | number | null | undefined>;
  // let e: E = null;
}

namespace g {
  function getUserInfo() {
    return { name: "zhufeng", age: 10 };
  }

  // 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
  type UserInfo = ReturnType<typeof getUserInfo>;
  const userA: UserInfo = {
    name: "zhufeng",
    age: 10,
  };

  type ReturnType2<T extends (...args: any[]) => any> = T extends (
    ...args: any[]
  ) => infer R
    ? R
    : any;
}
