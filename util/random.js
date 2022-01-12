/**
 * 
 * @param {*} n  自定义长度
 * @returns  生成唯一id
 */
var random = function(n) { // 生成n位长度的字符串
    var str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
    var result = "";
    for(var i = 0; i < n; i++) {
        result += str[parseInt(Math.random() * str.length)];
    }
    return result;
}


module.exports = random;