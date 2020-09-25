/*文章密码sha256*/
const crypto=require("crypto");
const print=require("./functionout");
const hash=crypto.createHash('sha256');
var arcticle={
    essay: "password",
    mygrandfather: "IMISSYOUYY",
    other: "随意"
}
hash.update(arcticle["mygrandfather"]);
//89db871a4741a6c29265ead0da76c73241fd10335e2b7213d87e68ef3ecf1d75
print(hash.digest("hex"));