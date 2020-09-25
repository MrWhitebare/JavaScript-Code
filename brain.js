// 定义数字0:
var zero = function (f) {
    return function (x) {
        return x;
    }
};

// 定义数字1:
var one = function (f) {
    return function (x) {
        return f(x);
    }
};

// 定义加法:
function add(n, m) {
    return function (f) {
        return function (x) {
            return m(f)(n(f)(x));
        }
    }
}
function multiply(n,m) {
    return function (f) {
        return function (x) {
            return m(n(f))(x);
        }
    }
}
function subtract(n,m) {
    return function (f) {
        return function (x) {
            return m(f)(n(f)(-x));
        }
    }
}

function divide(n,m) {
    return function (f) {
        return function (x) {
            return n(f);
        }
    }

}
// 计算数字2 = 1 + 1:
var two = add(one, one);

// 计算数字3 = 1 + 2:
var three = add(one, two);

// 计算数字5 = 2 + 3:
var five = add(two, three);

// 你说它是3就是3，你说它是5就是5，你怎么证明？

// 呵呵，看这里:

// 给3传一个函数,会打印3次:
(three(function () {
    console.log('print 3 times');
}))();

// 给5传一个函数,会打印5次:
(five(function () {
    console.log('print 5 times');
}))();
var six=multiply(two,three);
(six(function () {
    console.log('print 6 times');
}))();
var four=subtract(six,three);
(four(function () {
    console.log('print 4  times');
}));
