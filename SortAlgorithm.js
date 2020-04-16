/*SortAlgorithm.js*/
var array=[3,5,28,6,7,9,15,89,95,1];
function print(Msg) {
    console.log(Msg);
}
//1.冒泡排序
/*
* 冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，
* 如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，
* 也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端*/
function bubbleSort(array) {
    const length=array.length;
    for (let i=length-1;i>0;i--){
        for(let j=0;j<i;j++){
            if(array[j]>array[j+1]){
                let tmp=array[j+1];
                array[j+1]=array[j];
                array[j]=tmp;
            }
        }
    }
}
//bubbleSort(array);
//print('冒泡排序：'+array);
//2.选择排序
/*
* 选择排序(Selection-sort)是一种简单直观的排序算法。
* 它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，
* 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
* 以此类推，直到所有元素均排序完毕。*/
function selectionSort(array) {
    const length=array.length;
    let minIndex,temp;
    for (let i=0;i<length-1;i++){
        minIndex=i;//假设第一个元素为最小值
        for (let j=i+1;j<length;j++){
            if(array[minIndex]>array[j])
                minIndex=j;
        }
        temp=array[minIndex];
        array[minIndex]=array[i];
        array[i]=temp;
    }
}
//selectionSort(array);
//print('选择排序：'+array);
//3.插入排序
/*
* 插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。
* 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。*/
function insertionSort(array) {
    const length=array.length;
    let preIndex,current;//preIndex为已完成排序的序列，current为当前序列序号
    for(let i=1;i<length;i++){
        preIndex=i-1;
        current=array[i];
        while (preIndex>=0&&array[preIndex]>current){
            array[preIndex+1]=array[preIndex];
            preIndex--;
        }
        array[preIndex+1]=current;//preIndex+1，当前合适的插入位置
    }
    return array;
}
//insertionSort(array);
//print('插入排序:'+array);
//4.希尔排序
/*
* 第一个突破O(n2)的排序算法，是简单插入排序的改进版。
* 它与插入排序的不同之处在于，它会优先比较距离较远的元素。
* 希尔排序又叫缩小增量排序。*/
function shellSort(array) {
    const length=array.length;
    for (let group=Math.floor(length/2);group>0;group=Math.floor(group/2)){
        //floor向下取整 group=5,2,1
        for (let i=group;i<length;i++){
            let j=i;
            let current=array[i];
            while (j-group>=0&&current<array[j-group]){
                array[j]=array[j-group];
                j=j-group;
            }
            array[j]=current;
        }
    }
}
//shellSort(array);
//print('希尔排序：'+array);
//5.归并排序
/*
* 归并排序是建立在归并操作上的一种有效的排序算法。
* 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
* 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，
* 再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。*/
function mergeSort(array) {
    var length=array.length;
    if (length<2)
        return array;
    var middle=Math.floor(length/2),
        left=array.slice(0,middle),
        right=array.slice(middle);
    //print('middle '+middle+',\n'+'left '+left+',\n'+'rigth '+right)
    return merge(mergeSort(left),mergeSort(right));
}
function merge(left,right) {
    var result=[];
    while (left.length>0&&right.length>0){
        if(left[0]<=right[0])
            result.push(left.shift());
        else
            result.push(right.shift());
    }
    while (left.length){
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
}
/*此排序方式传递参数于函数中，没有改变原有数组本身的数值*/
//print('归并排序：'+mergeSort(array));
//6.快速排序
/*通过一趟排序将待排记录分隔成独立的两部分，
其中一部分记录的关键字均比另一部分的关键字小，
则可分别对这两部分记录继续进行排序，以达到整个序列有序。
(1)挑选一个基准pivot
(2)重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作
(3)递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。*/
function QuickSort(array,left,right) {
    var length=array.length,
        partitionIndex,
        left =typeof left!='number'?0:left,
        right=typeof right!='number'?length-1:right;
    if(left<right){
        partitionIndex=partition(array,left,right);
        QuickSort(array,left,partitionIndex-1);
        QuickSort(array,partitionIndex+1,right);
    }
    return array;
}
function partition(array,left,right) {//分区操作
    var pivot=left,//基准值
        index=pivot+1;
    for(let i=index;i<=right;i++) {
        if(array[i]<array[pivot]){
            swap(array,i,index);//将第一组中的最小值放置于基准之前
            index++;//是的sublist有序
        }
    }
    swap(array,pivot,index-1);//交换最小值与基准
    return index-1;
}
function swap(array,i,j) {
    var temp=array[i];
    array[i]=array[j];
    array[j]=temp;
}
//QuickSort(array);
//print('快速排序'+array);
//7.堆排序
/*堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。
*堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。*/
var length;// 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function BuildMaxHeap(array) {//建立大顶堆
    length=array.length;
    for (let i=Math.floor(length/2);i>=0;i--){
        heapadjustment(array,i);
    }
}
function Swap(array,i,j) {
    var temp=array[i];
    array[i]=array[j];
    array[j]=temp;
}
function heapadjustment(array,i) {
    var left=2*i+1,
        right=2*i+2,
        largest=i;
    if(left<length&&array[left]>array[largest])
        largest=left;
    if(right<length&&array[right]>array[largest])
        largest=right;
    if (largest != i) {
        Swap(array, i, largest);
        heapadjustment(array, largest);
    }
}
function HeapSort(array) {
    BuildMaxHeap(array);
    for (let i=array.length-1;i>=0;i--){
        Swap(array,0,i);
        length--;
        heapadjustment(array,0);
    }
    return array;
}
//HeapSort(array);
//print('堆排序：'+array);
//8.计数排序
/*
* 计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。
* 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。*/
function CountingSort(array,maxValue) {
    var bucket=new Array(maxValue+1),
        sortedIndex=0;
    var arrLength=array.length;
    var bucketLength=maxValue+1;
    for (let i=0;i<arrLength;i++){
        if (!bucket[array[i]]) {
            bucket[array[i]] = 0;
        }
        bucket[array[i]]++;
    }
    for (let j = 0; j < bucketLength; j++) {
        while (bucket[j] > 0) {
            array[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return array;
}
function max(array){
    let max=array[0],i=1;
    while (i<array.length){
        if(max<array[i])
            max=array[i];
        i++;
    }
    return max;
}
//CountingSort(array,max(array));
//print('计数排序'+array);
//桶排序
/*
* 桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
* 桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，
* 每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。*/
function BucketSort(array,bucketSize) {
    if(array.length===0)
        return array;
    var maxValue=array[0];
    var minValue=array[0];
    for (let i=1;i<array.length;i++){
        if(maxValue<array[i])
            maxValue=array[i];//最大值
        else if(minValue>array[i])
            minValue=array[i];//最小值
    }
    //桶的初始化
    var Default_bucket_size=5;
    bucketSize=bucketSize||Default_bucket_size;
    var bucketCount=Math.floor((maxValue-minValue)/bucketSize)+1;
    var buckets=new Array(bucketCount);
    for (let i=0;i<buckets.length;i++)
        buckets[i]=[];
    //利用函数映射将数据分配到各个桶中
    for (let i=0;i<array.length;i++)
        buckets[Math.floor((array[i]-minValue)/bucketSize)].push(array[i]);
    array.length=0;
    for (let i=0;i<buckets.length;i++){
        insertionSort(buckets[i]);//对每个桶进行排序
        for (let j=0;j<buckets[i].length;j++)
            array.push(buckets[i][j]);
    }
    return array;
}
function getBucketSize(array){//获取桶的尺寸
    let maxValue=max(array);
    return Math.floor(maxValue/10);
}
//BucketSort(array,getBucketSize(array));
//print('桶排序：'+array);
//10.基数排序
/*
* 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，
* 直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
* 最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。*/
var counter=[];
function radixSort(array,maxDigit) {
    var mod=10;
    var dev=1;
    for (let i=0;i<maxDigit;i++,dev*=10,mod*=10) {
        for (let j = 0; j < array.length; j++) {
            var bucket = parseInt((array[j] % mod) / dev);
            if (counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(array[j]);
        }
        var pos = 0;
        for (let i = 0; i < counter.length; i++) {
            var value = null;
            if (counter[i] != null) {
                while ((value = counter[i].shift()) != null)
                    array[pos++] = value;
            }
        }
    }
    return array;
}
function getMaxDigit(maxValue){
    let maxdigit=0;
    while (maxValue!=0){
        maxValue=parseInt(maxValue/10);
        maxdigit++;
    }
    return maxdigit;
}
radixSort(array,getMaxDigit(max(array)));
print('基数排序'+array);
