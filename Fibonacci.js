//Fibonacci.js 斐波那契数列
function fibonacci(max) {
    var a=0;
        b=1;
        array=[0,1];
    while (array.length<max){
        [a,b]=[b,a+b];
        array.push(b);
    }
    return array;
}
function print(str) {
    console.log(str);
}
function* fib(max) {
    var a=0;
        b=1;
        n=0;
    while (n<max){
        yield a;
        [a,b]=[b,a+b];
        n++;
    }
    return;
}
function* next_id() {
    var current_id=1;
    while(true){//无限循环
        yield current_id++;
    }
}
print(fibonacci(5));
print(fibonacci(10));
for(var x of fib(10))
    print(x);
var x,
    pass=true,
    g=next_id();
for (x = 1; x < 100; x ++) {
    if (g.next().value !== x) {
        pass = false;
        print('测试失败!');
        break;
    }
}
if(pass)
    print('测试通过！')