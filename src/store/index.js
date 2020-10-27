console.log('仓库文件')
const arr = [1, [2, [3, [4, 5]]], 6];
const res1 = arr.flat(Infinity);
const res2 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');
console.log(res1)