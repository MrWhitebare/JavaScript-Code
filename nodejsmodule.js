'use strict'
/*fs 异步读取文件*/
function print(Msg) {
    console.log(Msg);
}
var fs=require('fs');
var path='/Program Files/txt/jsstream.txt';
fs.readFile(path,'utf-8',function (error,data) {
    if(error){
        print(error);
    }
    else{
        print('******异步读取文件******');
        print(data);
    }
});
var binary='/Program Files/txt/三国演义.png';
fs.readFile(binary,function (error,data) {
    //当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象
    //Buffer对象就是一个包含零个或任意个字节的数组
    if(error){
        print(error);
    }
    else {
        var str=data.toString('utf-8');
        var buffer=Buffer.from(str,'utf-8');
        print(buffer);
        print(data.length+'bytes');
    }
});
/*同步读取文件*/
print('******同步读取文件******');
var data=fs.readFileSync(path,'utf-8');
print(data);//同步先执行!

var data='Hello JavaScript!';
var output='/Program Files/txt/jsstream.txt';
var bool=false;
fs.writeFile(output,data,function (error) {
    if (error)
        print(error);
    else
        print('写入文件成功！');
});
data='I change the content of JavaScript!';
fs.stat(path,function (err,stat) {
    if (err)
        print(err);
    else{
        bool=stat.isFile();
        if(bool){
            fs.writeFileSync(output,data,'utf-8');
            print('change success!');
        }
        print(bool);
    }
});
fs.stat(path, function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

/*stream 文件流*/
var rs=fs.createReadStream(path,'utf-8');
rs.on('data', function (chunk) {
    console.log('DATA:');
    console.log(chunk);
});
rs.on('end',function (end) {
    print('END');
});
rs.on('error',function (err) {
    print(err);
});
var out='/Program Files/txt/streamwrite.txt';
var ws=fs.createWriteStream(out);
ws.write(new Buffer('使用Stream写入二进制数据...\n','utf-8'));
ws.write(new Buffer('END.', 'utf-8'));

/*http协议*/
var http=require('http');
//创建http server 传入回调函数
var server=http.createServer(function (request,response) {
    //回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    print(request.method+'\n'+request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200,{'Content-Tyep':'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello World!</h1>');
});
//服务器监听8080端口
server.listen(8080);
print('Server is running at http://127.0.0.1:8080/');
var url=require('url');//解析url
print(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
var Path=require('path');
//解析当前目录
var WorkDir=Path.resolve('.');
var filePath=Path.join(WorkDir,'pub','index.html');
print(filePath);