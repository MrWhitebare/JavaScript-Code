'use strict'
/*深度学习promise*/
var print=require('./functionout');
function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve("done");
        }, interval);
    });
};
/*
* 直接等待所有三个timeoutPromise（）调用，使每个调用3秒钟。
* 后续的每一个都被迫等到最后一个完成 - 如果你运行第一个例子，你会看到弹出框报告的总运行时间大约为9秒。*/
/*
async function timeTest() {
    await timeoutPromise(3000);
    await timeoutPromise(3000);
    await timeoutPromise(3000);
}*/
//我们将三个Promise对象存储在变量中，这样可以同时启动它们关联的进程。 3秒
async function timeTest() {
    const timeoutPromise1 = timeoutPromise(3000);
    const timeoutPromise2 = timeoutPromise(3000);
    const timeoutPromise3 = timeoutPromise(3000);

    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
}
let startTime = Date.now();
timeTest().then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    print("Time taken in milliseconds: " + timeTaken);
});
