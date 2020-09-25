//Object.js
/*Date Object*/
function print(Msg) {
    console.log(Msg);
}
var today=new Date();
//Mon Mar 02 2020 14:58:10 GMT+0800 (中国标准时间)
print(today);//2020-03-02T07:12:48.744Z
print(today.getFullYear());//2020
print(today.getMonth());//2=3  月份，注意月份范围是0~11，5表示六月
print(today.getDate());//2
print(today.getDay());//Monday 1 星期
print(today.getHours());//15
print(today.getMinutes())//17
print(today.getSeconds())//6
print(today.getMilliseconds())//毫秒
print(today.getTime());//时间戳
var today = new Date(2020,1,14,13,14,520);
if (today.getMonth() === 1 && today.getDate() === 14) {
    //alert('亲爱的，我预定了晚餐，晚上6点在餐厅见！');
    print('亲爱的，我预定了晚餐，晚上6点在餐厅见！');
}
/*RegExp 正则表达式*/
var RegExp1=/ABC\-001/;
var RegExp2=new RegExp('ABC\\-001');//因为字符串的转义问题，字符串的两个\\实际上是一个\
print(RegExp1);
print(RegExp2);
//判断正则表达式是否匹配
var RegExptxt=/^\d{3}\-\d{3,8}$/;//行首必须是3位数字 ‘-’ 行尾3-8位小数
print(RegExptxt.test('010-12345')); // true
print(RegExptxt.test('010-1234'));//true
print(RegExptxt.test('010-1234578'));//true
//切分字符串
print('a b  c   d'.split(/\s+/));//+至少一个字符
print('a,b, c  d'.split(/[\s\,]+/));
print('a,b;; c  d'.split(/[\s\,\;]+/));
//分组
var RegExpGroup=/^(\d{3})\-(\d{3,8})$/;
print(RegExpGroup.exec('010-12345'));//['010-12345','010','12345']
var RegExpTime = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
//(0[0-9]|1[0-9]|2[0-4]|[0-9])匹配0x(0-9)|1X(0-9)|2x(0-3)=>0~23数字
print(RegExpTime.exec('19:05:30'));// ['19:05:30', '19', '05', '30']
//贪婪匹配
var RegExpgreedy=/^(\d+)(0*)$/;
print(RegExpgreedy.exec('102300'));//['102300','102300','']
var RegExpgreedy1=/^(\d+?)(0*)$/;
//\d+?即非贪婪搜索
print(RegExpgreedy1.exec('102300'));//['102300','1023','00',]
//全局匹配
var r1 = /test/g;
// 等价于:
var r2 = new RegExp('test', 'g');
var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;
// 使用全局匹配:
print(re.exec(s)); // ['JavaScript']
print(re.lastIndex); // 10
print(re.exec(s)); // ['VBScript']
print(re.lastIndex); // 20
print(re.exec(s)); // ['JScript']
print(re.lastIndex); // 29
print(re.exec(s)); // ['ECMAScript']
print(re.lastIndex); // 44
print(re.exec(s)); // null，直到结束仍没有匹配
var test = /^\<(\w+\s?\w+)\>\s?(\w+@\w+\.\w+)$/;
var test1 = /^\<([a-zA-Z]{3}\s?[A-Za-z]{5})\>\s?([a-z]{3}@[a-z]{7}\.[a-z]{3})$/;
str='<Tom Paris> tom@voyager.org';
print(test.exec(str));
print('精确匹配'+'\n'+test1.exec(str));
/*JSON JavaScript Object Notation*/
//序列化
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
var s=JSON.stringify(xiaoming,['name','age','skills'],' ');
//replacer 控制如何筛选对象的键值，输出指定的属性，可以传入Array：
print(s);
var str=JSON.stringify(xiaoming,null,' ');
print(str);
//var strfoo=JSON.stringify(xiaoming,convert,' ');
var strfoo=JSON.stringify(xiaoming,(key,value)=>typeof value==='string'?value.toLowerCase():value,' ');
print(strfoo);
/*精确控制序列化
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};
*/
//反序列化
//JSON格式的字符串=>JSON.parse()把它变成一个JavaScript对象
JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
JSON.parse('{"name":"小明","age":14}'); // Object {name: '小明', age: 14}
JSON.parse('true'); // true
JSON.parse('123.45'); // 123.45
//JSON.parse()还可以接收一个函数，用来转换解析出的属性
var obj =JSON.parse('{"name":"小明","age":14}',(key,value)=>key==="name"?value+'同学':value);
print(obj);
var url = 'https://api.openweathermap.org/data/2.5/forecast?q=Beijing,cn&appid=800f49846586c3ba6e7052cfc89af16c';
let jQuery = $.getJSON(url,function (data) {
    var info = {
        city: data.city.name,
        weather: data.list[0].weather[0].main,
        time: data.list[0].dt_txt
    };
    print(JSON.stringify(info, null, '  '));
});