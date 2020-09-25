/*callback.js*/
function print(Msg) {
    console.log(Msg);
}
function callback() {
    print('Done');
}
print('Before setTimeout()');
setTimeout(callback,10000);
print('After setTimeout()');
/*
Before setTimeout()
After setTimeout()
等待10s……
Done
*/
/*Promise串行执行*/
function multiply(input) {
    return new Promise(function (resolve,reject) {
       print('calculating ' + input + ' x ' + input + '...');
       setTimeout(resolve, 500, input * input);
    });
}
function add(input) {
    return new Promise(function (resolve,reject) {
        print('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve,500,input+input);
    });
}
var p=new Promise(function (resolve,reject) {
    print('start new Promise...');
    resolve(123);
});
p.then(multiply)
    .then(add)
    .then(multiply)
    .then(add)
    .then(function (result) {
        print('Got value: ' + result);
    });
/*Promise并行执行*/
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    print(results); // 获得一个Array: ['P1', 'P2']
});
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
});