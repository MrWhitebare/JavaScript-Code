'use strict'
/*连接Mysql*/
var mysql=require('mysql');
var print=require('./functionout');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    port:3306,
    database:'test'
});
connection.connect();
var sql='SELECT * From websites';
connection.query(sql,function (error,results) {
    if(error){
        print('[SELECT ERROR] - ',err.message);
        return;
    }
    else {
        print('--------------------------SELECT----------------------------');
        print(results);
        print('------------------------------------------------------------\n\n');
    }
});
//插入数据
var addsql='INSERT INTO websites(Id,name,url,alexa,country,founder) VALUES(0,?,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN','Rookie'];
connection.query(addsql,addSqlParams,function (error,results) {
    if(error){
        print('[SELECT ERROR] - ',err.message);
        return;
    }
    else {
        print('--------------------------Insert----------------------------');
        print('Insert ID: ',results);
        print('------------------------------------------------------------\n\n');
    }
});
//更新数据
var updatesql='UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var updateParams = ['菜鸟移动站', 'https://m.runoob.com',6];
connection.query(updatesql,updateParams,function (error,results) {
    if(error){
        print('[SELECT ERROR] - ',err.message);
        return;
    }
    else {
        print('--------------------------Update----------------------------');
        print('UPDATE affectedRows',results.affectedRows);
        print('------------------------------------------------------------\n\n');
    }
});
//删除数据
var deletesql='DELETE FROM websites where id=6';
connection.query(deletesql,function (error,results) {
    if(error){
        print('[SELECT ERROR] - ',err.message);
        return;
    }
    else {
        print('--------------------------Delete----------------------------');
        print('DELETE affectedRows',results.affectedRows);
        print('------------------------------------------------------------\n\n');
    }
});
connection.end();