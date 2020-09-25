/*异步操作*/
const XML=require('xmlhttprequest');
var readline=require('readline');
const jsdom=require('jsdom');
const {JSDOM}=jsdom;
const {document}=(new JSDOM('<!document html><html><body></body></html>')).window;
global.document=document;
const window=document.defaultView;
const $=require('jquery')(window);
function print(Msg) {
    console.log(Msg);
}
function checkVersion() {
    print('jquery 版本:'+$.fn.jquery)
}
checkVersion();
/*
function getPrice(url) {
    var xhr=new XML.XMLHttpRequest();
    xhr.onreadystatechange=function () {
        if (xhr.readyState==4){
            if(xhr.status==200) {
                return showPrice(xhr.responseText);
            }
        }
    }
    xhr.open('GET',url);
    xhr.send();
}
function showPrice(data) {
    var Msg=data.slice(10,-2);
    Msg=JSON.parse(Msg);
    print('当前价格：\n' +
        Msg['0000001'].name +': ' +
        Msg['0000001'].price + '；\n' +
        Msg['1399001'].name + ': ' +
        Msg['1399001'].price);
}
var url='http://api.money.126.net/data/feed/0000001,1399001?callback=showPrice';
//callback本地浏览器执行函数showPrice ，而在此环境中只能获得返回数据而无法直接执行函数
getPrice(url);
*/
//创建readline接口实例
var read=readline.createInterface({input:process.stdin
    ,output:process.stdout});
let url = 'https://free-api.heweather.net/s6/weather/now?location=';
let key='&key=f3196f6788c044da8f21560e1f1438b9';
let city='';
let newURL='';
var xhr=new XML.XMLHttpRequest();
xhr.onreadystatechange=function () {
    if(xhr.readyState==4){
        if(xhr.status==200){
            return success(xhr.responseText);
        }
        else{
            print('获取html文本失败')
        }
    }
}
function success(data) {
    var weather=JSON.parse(data);
    if(weather.HeWeather6[0].status ==='ok'){
        print('查询成功'+'\n'+
            '当前城市：'+weather.HeWeather6[0].basic.location+ '\n'+
            '当前时间：北京时间['+weather.HeWeather6[0].update.loc+']'+'\n'+
            '体感温度：'+weather.HeWeather6[0].now.fl+"℃"+'\n'+
            '气温：'+weather.HeWeather6[0].now.tmp+"℃"+'\n'+
            '天气：'+weather.HeWeather6[0].now.cond_txt+'\n'+
            '风向：'+weather.HeWeather6[0].now.wind_dir +'\n'+
            '风力：'+weather.HeWeather6[0].now.wind_sc);
    }
    else {
        print('查询失败！');
    }
}
read.question('请输入需要查询的城市名称：\n',function (answer) {
    city=answer;
    newURL=url+city+key;
    read.close();//关闭输入
});
read.on('close',function () {
    print(newURL);
    xhr.open('GET',newURL);
    xhr.send();
    setTimeout(function () {
        process.exit(0);
    },2000);
});
function ajaxLog(data) {
    print(data);
}
setTimeout(function () {
    var jqxhr=$.ajax(newURL,{
        dataType :'json'
    }).done(function (data) {
        ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
    }).fail(function(xhr,status){
        ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
    }).always(
        function () {
            ajaxLog('请求完成: 无论成功或失败都会调用');
        });
},5000);


