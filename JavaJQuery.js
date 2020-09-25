'use strict';
/*JavaJQuery.js*/
var fs=require('fs');
const jsdom=require('jsdom');
const {JSDOM}=jsdom;
const {document}=(new JSDOM('<!document html><html><body></body></html>')).window;
global.document=document;
const window=document.defaultView;
const $=require('jquery')(window);
if (typeof(window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}
fs.readFile('/Program Files/txt/data.txt','utf-8',function (error,data) {
    if(error){
        console.log(error);
    }
    else {
        console.log(data);
    }
});
console.log('版本'+$.fn.jquery);
$.getJSON('http://example.com/ajax',function (data) {
    console.log('IO结果返回后执行...');
    console.log(data);
});
console.log('不等待IO结果直接执行后续代码...');