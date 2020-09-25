//browser.js
function print(Msg) {
    console.log(Msg);
}
print('Windows inner size'+window.innerWidth+'Windows inner height'+window.innerHeight);
print(navigator.appName);
print(navigator.appName);
print(navigator.appVersion);
print(navigator.language);
var url="http://www.example.com:8080/path/index.html?a=1&b=2#TOP";
var web=location.assign(url);
print(web.protocol);//http
print(web.host);//www.example.com
print(web.port);//8080
print(web.pathname);///path/index.html
print(web.search);//?a=1&b=2#
print(web.hash);//TOP

