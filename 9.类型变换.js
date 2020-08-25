"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let p = {
    name: "lee",
    fly() { },
    talk() { },
};
// let c1: Tc = "lee";
let c2 = 1;
function mixin(one, two) {
    let result = {};
    for (let i in one) {
        result[i] = one[i];
    }
    for (let i in two) {
        result[i] = two[i];
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
function getName(p) {
    return p.name;
}
getName({
    name: "123",
    age: 1,
    gender: "femal",
});
let FrontEndJob = {
    name: "lee",
};
let name = "lee";
function getValueByKey(p, key) {
    return p[key];
}
let val = getValueByKey({
    name: "lee",
    age: 18,
    gender: "male",
}, "name");
let p2 = {};
let p3 = { name: "lee" };
var a;
(function (a) {
    function pick(o, keys) {
        return keys.map((key) => o[key]);
    }
    let user = {
        name: "lee",
        age: 18,
        gender: "male",
    };
    pick(user, ["name", "age"]);
})(a || (a = {}));
let condition = {
    //condition = Sky
    sky: "lee",
};
/**
 * 条件类型的分发
 */
let condition2; //condition2 = Water | Sky
/**
 * 内置条件类型
 * Exclude  从 T 可分配给的类型中排除 U
 * Extract  从 T 可分配的类型中提取 U
 * NonNullable  从 T 中排除 null 和 undefined
 * ReturnType  获取函数类型的返回类型
 * Parameters  Constructs a tuple type of the types of the parameters of a function type T
 * InstanceType  获取构造函数类型的实例类型
 */
var b;
(function (b) {
    let e = 10;
})(b || (b = {}));
var e;
(function (e_1) {
    let e = "1";
})(e || (e = {}));
var g;
(function (g) {
    function getUserInfo() {
        return { name: "zhufeng", age: 10 };
    }
    const userA = {
        name: "zhufeng",
        age: 10,
    };
})(g || (g = {}));
