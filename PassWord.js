'use strict'
/*crypto模块的目的是为了提供通用的加密和哈希算法。*/
//MD5
const crypto=require('crypto');
const print=require('./functionout');
const hash=crypto.createHash('md5');
hash.update('Hello, world!');
hash.update('hello nodejs');
print(hash.digest('base64'));
/*hash.digest 以何种进制输出
B binary 二进制 O octal 八进制  De Decimal 十进制 H hex 十六进制
* */
//Hamc
const hamc=crypto.createHmac('sha256','secret-key');
hamc.update('Hello World!');
hamc.update('Hello nodejs');
print(hamc.digest('hex'));
//AES
function aesEncrypt(data,key) {
    const cipher=crypto.createCipher('aes192',key);
    var crypted=cipher.update(data,'utf8','hex');
    crypted+=cipher.final('hex');
    return crypted;
}
function aesDecrypt(encrypted,key) {
    const decipher= crypto.createDecipher('aes192',key);
    var decrypted=decipher.update(encrypted,'hex','utf8');
    decrypted+=decipher.final('utf8');
    return decrypted;
}
var data='Hello, this is a secret message!';
var key='Password!';
var encrypted=aesEncrypt(data,key);
var decrypted=aesDecrypt(encrypted,key);
print('Plain text:'+data);
print('Encrypted:'+encrypted);
print('Decrypted:'+decrypted);
//Diffie-Hellman

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

print('Prime: ' + prime.toString('hex'));
print('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
print('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
print('Secret of Xiao Hong: ' + hong_secret.toString('hex'));