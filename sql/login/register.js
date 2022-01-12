const query =require('../../config/mysql');

// 查询用户
let registerUser = function (choose,userName,password){
    if(choose == 0){
        let _sql = `select userName from User where userName ='${userName}'`
        return query( _sql,__filename)
    }else if(choose == 1){
        let _sql = `select userName,userId from User where userName = '${userName}' and password = '${password}'`
        return query( _sql,__filename)
    }
     
}
// 注册用户
let insertUser = function(userName,userId,password,creationTime,power){
    let _sql = `INSERT INTO User(userName,userId,password,creationTime,power) VALUES(
    '${userName}','${userId}','${password}','${creationTime}','${power}')`
    return query( _sql,__filename)
} 

module.exports = {registerUser,insertUser} 