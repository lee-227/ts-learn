"use strict";
/**
 * 函数可以指定参数的类型和返回值的类型
 */
function hello(x) {
    return x;
}
let getName = function (x) {
    return x;
};
/**
 * 没有返回值
 */
let hello2 = function (x) {
    // return undefined
};
/**
 * 可选参数
 * 在ts中形参和实参必须一样，不一样就要配置可选参数，而且必须是最后一个参数
 */
function print(name, age) {
    return {
        name,
        age,
    };
}
console.log(print('lee', 4));
/**
 * 默认参数
 */
function ajax(url, method = 'GET') {
    return {
        url,
        method,
    };
}
console.log(ajax('lee'));
/**
 * 剩余参数
 */
function sum(...numbers) { }
sum(1, 2, 3);
/**
 * 函数重载
 * java中是指两个或两个以上的同名函数，参数不一样
 * ts中表现为同一个函数提供多个函数类型定义
 */
let obj = {};
function attr(val) {
    if (typeof val === 'string') {
        obj.name = val;
    }
    else {
        obj.age = val;
    }
}
attr(1);
console.log(obj);
attr('lee');
console.log(obj);
// attr(true)
