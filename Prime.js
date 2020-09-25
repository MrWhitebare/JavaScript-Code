function judgeprime(arr){
    var prime=[];
    for(let i=1;i<arr.length+1;i++){
        prime.push(true);
    }
    for(let i=2;i<arr.length+1;i++){
        for(let j=i*2;j<arr.length;j+=i)
            prime[j]=false;
    }
    for(let j=2;j<arr.length+1;j++){
        if(prime[j]){
            console.log('质数'+j);
        }
        else{
            console.log('合数'+j);
        }
    }
}
function get_primes(arr) {
    return arr.filter(function(x){
        var p=true;
        if(x===1){
            p=false;
        }
        else{
            let i=2;
            while(i<x){
                if(x%i==0){
                    p=false;
                    break;
                }
                i++;
            }
        }
        if(p){
            return x;
        }
    });
}
var array=[];
for (let i=0;i<101;i++){
    array.push(i);
}
judgeprime(array);
console.log(get_primes(array) );
