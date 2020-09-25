/*ConsoleRead.js控制输入，输出*/
var readline=require('readline');//引入readline modules
//创建readline接口实例
var read=readline.createInterface({input:process.stdin,output:process.stdout});
//question方法
/*read.question("What's your name?",function (answer) {
    console.log('Your name is'+answer);
    read.close();//结束程序
})
//close事件监听
read.on('close',function () {
    process.exit(0);
});*/
read.on('line',function (line) {
    switch (line.trim()) {
        case 'copy':
            console.log('复制');
            break;
        case 'hello':
            read.write('Write');
            console.log('World!');
            break;
        case 'close':
            read.close();
            break;
        default:
            console.log('没有找到命令');
            break;
    }
    read.prompt();//每执行完一次使用命令！
})
read.on('close',function () {
    console.log('bye bye!');
    process.exit(0);
});
//line'事件，这个事件就是在用户输完一行，按下回车后就会触发的事件，
// 它会将用户输入的数据通过回调函数传回来，可在此方法里处理用户输入的数据
/*命令行执行*/
read.setPrompt('Linux>');
read.prompt();