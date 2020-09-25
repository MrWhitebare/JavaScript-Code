'use strict'
/*underscore.js*/
var fs=require('fs');
const jsdom=require('jsdom');
const {JSDOM}=jsdom;
const {document}=(new JSDOM('<!document html><html><body></body></html>')).window;
global.document=document;
const window=document.defaultView;
const _=require('underscore')(window);
function print(str){
    console.log(str);
}
print(_.map([1,2,3],(x)=>x^2));

