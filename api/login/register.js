const { registerUser, insertUser } = require('../../sql/login/register');
const logsUtil = require('../../config/logs');
const md5 = require('../../util/md5');
const random = require('../../util/random');
const getNowTime = require('../../util/newdate');
const reginters = async (ctx, next) => {
    try{
        let req = ctx.request.body;
        if (req.userName && req.password) {
            let choose = 0;
            let data = await registerUser(choose, req.userName);  //查询用户是否存在
            if(data.length == 0){
                let md5Pass = md5.MD5(req.password);
                await insertUser(req.userName,random(36),md5Pass,getNowTime(),'1'); //注册用户
                let choose = 1;
                let datas = await registerUser(choose, req.userName, md5Pass);  //查询用户
                ctx.response.status = 200;
                ctx.body = {
                    code: 1,
                    row: datas,
                    msg: '注册成功'
                }
            }else{
               if (data[0].userName === req.userName) { //判断传进来的用户是否存在库里
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '用户已经存在'
                }
             }
            }
            logsUtil.logResponse(ctx, req);	  //记录响应日志
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 0,
                msg: '参数不齐全'
            }
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

module.exports = reginters