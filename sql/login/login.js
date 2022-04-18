const query =require('../../config/mysql');
let loginUser = function (userName,password){
    let _sql = `select * from  User where userName ='${userName}' or password ='${password}' `
    return query( _sql,__filename)
}
let userid = function (userId){
    let _sql = `select equipment from  User where userId ='${userId}' `
    return query( _sql,__filename)
}
let INSERTlog = function(userName,userId,LoginTime,ip,equipment){
    let _sql = `INSERT INTO loginlog(userName,userId,LoginTime,ip,equipment) VALUES(
        '${userName}','${userId}','${LoginTime}','${ip}','${equipment}')`
    return query( _sql,__filename)
}
let updateUser = function(userId,equipment){
    let _sql = `UPDATE User SET equipment = '${equipment}' where userId = '${userId}'`
    return query( _sql,__filename)
}

let slectUser = function(userId){
    let _sql = `select * from v_user where userId = '${userId}'`
    return query( _sql,__filename)
}

module.exports = {loginUser,INSERTlog,updateUser,userid,slectUser}