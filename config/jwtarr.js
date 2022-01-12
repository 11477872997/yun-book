/**
 *  路由接口权限配置是否需要tonken 认证
 */
 const myAPI  = {   //权限
    reginters: /^\/api\/reginters/,
    login: /^\/api\/login/,
  }
  
  const jwtarr = [
    myAPI.reginters,    
    myAPI.login,  
  
  ]
  
  module.exports = jwtarr