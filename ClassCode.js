/*ClassCode.js*/
/*创建对象*/
function print(str) {
    console.log(str);
}
function createStudent(name) {
    // 基于Student原型创建一个新对象:
    var s = Object.create(Student);
    // 初始化新对象:
    s.name = name;
    return s;
}
function student(name) {
    this.name = name;
    this.hello = function () {
        print('Hello, ' + this.name + '!');
    }
}
function Cat(name) {
    this.name=name;
}
Cat.prototype.say = function(){
    return("Hello, " + this.name + "!");
};
function cat(name) {
    this.name=name;
    this.say=function () {
        print('Hello, '+this.name+'!');
    }
}
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        print(this.name + ' is running...');
    }
};
var xiaoming = {
    name: '小明'
};
xiaoming.__proto__=Student;
print(xiaoming.run());
var xiaohong=createStudent('小红');
print(xiaohong.run());
print(xiaohong.__proto__===Student);
xiaohua=new student('校花');
print(xiaohua.name);
print(xiaohua.hello());
print(xiaohua.constructor===student.prototype.constructor)//constructor对象指向student函数本身 true
print(student.prototype.constructor === student); // true
print(Object.getPrototypeOf(xiaohua) === student.prototype); // true
print(xiaohua instanceof student); // true
var kitty = new Cat('Kitty');
var doraemon = new Cat('哆啦A梦');
print(kitty.name);
print(kitty.say==doraemon.say);
/*原型继承*/
function Engineer(props) {
    this.name=props.name||1;
}
Engineer.prototype.say=function () {
    print('Hello, '+this.name+'!');
}
// PrimaryEngineer构造函数:
function PrimaryEngineer(props) {
    // 调用Engineer构造函数，绑定this变量:
    Engineer.call(this, props);
    this.grade = props.grade || 1;
}
//空函数
function F() {
}
// 把F的原型指向Engineer.prototype:
F.prototype = Engineer.prototype;
// 把PrimaryEngineer的原型指向一个新的F对象，F对象的原型正好指向Engineer.prototype:
PrimaryEngineer.prototype = new F();
// 把PrimaryEngineer原型的构造函数修复为PrimaryEngineer:
PrimaryEngineer.prototype.constructor = PrimaryEngineer;
// 继续在PrimaryEngineer原型（就是new F()对象）上定义方法：
PrimaryEngineer.prototype.getGrade = function () {
    return this.grade;
};
// 创建xiaoming:
var xiaoli = new PrimaryEngineer({
    name: '小明',
    grade: 2
});
print('姓名：'+xiaoli.name);// '小明'
print('成绩：'+xiaoli.grade);// 2
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
//实现原型继承链
inherits(PrimaryEngineer,Engineer);
/*class类继承*/
class Teacher {
    constructor(name) {
        this.name=name;
    }
    say(){
        print('Hello, '+this.name+'!');
    }
}
var huolei=new Teacher('霍蕾');
huolei.say();
//继承
class Primaryteacher extends Teacher{
    constructor(name,grade) {
        super(name);//super调用父类的构造方法
        this.grade=grade;
    }
    myGrade(){
        print('I am '+this.name+',My grade is '+this.grade+'!');
    }
}
var chufan=new Primaryteacher('楚芳',98);
chufan.say();
chufan.myGrade();
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal{
    constructor(name) {
        super(name);
    }
    say(){
        console.log('hello, '+this.name);
    }
}
var dog=new Dog('狗');
dog.say();