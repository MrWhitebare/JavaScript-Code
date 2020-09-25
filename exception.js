/*exception.js 异常处理*/
/*如果在一个函数内部发生了错误，它自身没有捕获，错误就会被抛到外层调用函数，
如果外层函数也没有捕获，该错误会一直沿着函数调用链向上抛出，
直到被JavaScript引擎捕获，代码终止执行。* */
function bar(s) {
    console.log('Begin bar()');
    console.log('bar length:'+s.length);
    console.log('End bar()');
}
function foo(s) {
    console.log('Begin foo()');
    bar(s);
    console.log('End foo()');
}
function main(s) {
    console.log('Begin main()');
    try{
        foo(s);
    }
    catch(e){
        console.log('出错了'+e);
    }
    console.log('End main()');
}
main(null);