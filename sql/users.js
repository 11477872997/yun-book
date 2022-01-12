const query =require('../config/mysql');

// 查找用户
let findUserData = function() {
    let _sql = `select * from users`
    return query( _sql,__filename)
  }
   
  
  module.exports = findUserData 