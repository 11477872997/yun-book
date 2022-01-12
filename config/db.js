const  dbConfig = {
    host:7777,
    // 数据库配置
    databases: {
        database: 'yunbook',//数据库名称
        user: 'root',//mysql用户名
        password: '123!@#qwe',//mysql密码
        port: '57622',//mysql端口号
        host: "gz-cdb-13d2sqwf.sql.tencentcdb.com",//服务器i
        //设置超时时间解决握手不活动超时问题
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
        // connecTimeout: 1000,//连接超时,
        // multipleStatements: false,//是否允许一个query中包含多条sql语句
        // waitForConnection: true,//当无连接池可用时，等待(true) 还是抛错(false)
		// connectionLimit: 100,//连接限制
		// queueLimit: 0//最大连接等待数(0为不限制)
    },
    jwtSecret:'123!@#qwe' ,   //token秘钥
    expireTime: '10s' ,  // 24小时过期  60 * 60 * 24 秒算   token时间
}

module.exports = dbConfig;