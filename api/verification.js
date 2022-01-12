//解析token
const logsUtil = require('../config/logs');

const verify = async (ctx, next) => {
    const req = ctx.request.body;
    try {
        ctx.body = {
            code: 1,
            msg: '123'
        }
    
    }catch(err){
        ctx.response.status = 500;
        ctx.body = {
            code: 0,
            msg:'服务器跑了'
        }
        logsUtil.logError(ctx, err);//记录异常日志
    }
   

}

module.exports = verify