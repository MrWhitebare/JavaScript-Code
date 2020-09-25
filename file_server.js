'ues strict'
 var fs=require('fs'),
     url=require('url'),
     path=require('path'),
     http=require('http');
function print(Msg) {
    console.log(Msg);
}
// 从命令行参数获取root目录，默认是当前目录:
var root=path.resolve(process.argv[2]||'.');
/* process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。
第一个元素为process.execPath。
第二个元素为当前执行的JavaScript文件路径。
剩余的元素为其他命令行参数。
因此，我们把要编译的文件名从第三个参数开始去设置，也意味着每次可以指定一个或多个文件去进行相应的处理。
*/
print(root);
//创建服务器
var server=http.createServer(function (request,response) {
    //获取url的path
    var pathname=url.parse(request.url).pathname;
    //获取对应本地文件路径
    var filepath=path.join(root,pathname);
    //获取文件状态
    fs.stat(filepath,function (err,stats) {
        if (!err){
            if(stats.isFile()){
                print('200'+request.url);
                response.writeHead(200);
                fs.createReadStream(filepath).pipe(response);
            }
            else {
                print('Directory');
                // 获取省缺文件目录数组
                const filepathArr = [
                    path.join(root, "/index.html"),
                    path.join(root, "/default.html")
                ];
                readRightFile(filepathArr, function(filepath) {
                    if (filepath) {
                        console.log('200 ' + request.url);
                        // 发送200响应:
                        response.writeHead(200);
                        fs.createReadStream(filepath).pipe(response);
                    }else {
                        // 出错了或者文件不存在:
                        console.log('404 ' + request.url);
                        // 发送404响应:
                        response.writeHead(404);
                        response.end('404 Not Found');
                    }
                });
            }
        }
        else {
            print('404'+response.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});
function readRightFile(filepathArr, callback, index = 0) {
    // 终止判断
    if (filepathArr.length <= index) {
        return false;
    }
    fs.stat(filepathArr[index], function(err) {
        if (err) { // 如果异常但是不是最后一条则继续递归
            if(index === filepathArr.length) {
                // 如果最后一条任然报错则表示目录中无法找到省缺文件
                callback(false);
                return false;
            }
            index += 1;
            readRightFile(filepathArr, callback, index);
        } else{
            // 找到之后再回调函数中返回对应路径
            callback(filepathArr[index]);
        }
    })
}

server.listen(8080);
print("Server is running at http://127.0.0.1:8080/");


