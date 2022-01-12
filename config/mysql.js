//mysqlConfig.js
const mysql = require('mysql');
const dbConfig = require('./db');//数据库配置和服务端口
const logsUtil = require('./logs');
// 创建数据池

const pool = mysql.createPool({
        database: dbConfig.databases.database,
        user: dbConfig.databases.user,
        password: dbConfig.databases.password,
        port: dbConfig.databases.port,
        host: dbConfig.databases.host,
        connectionLimit: dbConfig.databases.connectionLimit,
        connectTimeout: dbConfig.databases.connectTimeout,
        acquireTimeout: dbConfig.databases.acquireTimeout,
        timeout: dbConfig.databases.timeout,
});

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      // 在数据池中进行会话操作
      pool.getConnection((err, connection)=> {
        // 如果有错误就抛出
        if (err) {
          console.log(err)
            console.error("数据库连接失败")
          reject( err )
        } else {
          console.info("数据库连接成功")
          connection.query(sql, values, ( err, rows) => {
            logsUtil.logHandle(sql,values) //保存所有操作的sql
            if ( err ) {
              console.log('查询数据失败');  
              reject( err )
            } else {
              // console.log(rows);
              resolve( rows )
            }
            // 结束会话
            connection.release();
            
          })
        }
        console.log(pool._freeConnections.indexOf(connection))  //查看数据库资源
      })
    })
  }


module.exports = query;

