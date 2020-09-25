//Closure.js 闭包机制
function  print(s) {
    return  console.log(s);
}
function count() {
    var array=[];
    for(let i=1;i<=3;i++)
        array.push(function () {
            return i*i;
        });
    return array;
}
function count2() {
    var array=[];
    for (var i=1; i<=3; i++)
        array.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));//(function(x){return x*x;})(i) 创建匿名函数立即执行
    return array;
}
/*计数器*/
function creat_counter(initial) {//初始initial==undefined
    var x=initial||0;
    return{
        inc:function () {//inc继承此函数
            x+=1;
            return x;
        }
    }
}
function makepow(n) {//n阶数
    return x=>Math.pow(x,n);
}
var results = count();
print(results);
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
print(f1());
print(f2());
print(f3());
var result=count2();
print('闭包机制'+result);
var f1=result[0];
var f2=result[1];
var f3=result[2];
print('闭包'+f1());
print('闭包'+f2());
print('闭包'+f3());
var counter=creat_counter();
print(counter.inc());
print(counter.inc());
print(counter.inc());
var counter2=creat_counter(10);
print(counter2.inc());
print(counter2.inc());
print(counter2.inc());
var Pow2=makepow(2);
var Pow4=makepow(4);
//闭包还可以把多参数的函数变成单参数的函数
print(Pow2(2));//4
print(Pow4(2));//16
