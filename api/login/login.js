// const {registerUser,insertUser}=require('../../sql/login/register');
const logsUtil = require('../../config/logs');
const { loginUser, INSERTlog, updateUser } = require('../../sql/login/login')
const md5 = require('../../util/md5');
//引入jwt做token验证
const jwt = require('jsonwebtoken');
const dbconfig = require('../../config/db')
const getNowTime = require('../../util/newdate');
const verson = require('../../util/token'); //验证token
const login = async(ctx, next) => {
    try {
        let req = ctx.request.body;
        if (!req.userName || !req.password) { //密码账号不能为空
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                msg: '密码或账号不能为空！'
            }
        } else {
            let md5Pass = md5.MD5(req.password);
            let date = await loginUser(req.userName, md5Pass); //是否存在查询用户
            if (Array.prototype.isPrototypeOf(date) && date.length === 0) {
                ctx.body = {
                    code: 0,
                    msg: '该用户尚未注册'
                }
            } else {
                for (let i = 0; i < date.length; i++) {
                    if (req.userName == date[i].userName) {
                        if (md5Pass !== date[i].password) {
                            ctx.body = {
                                code: 0,
                                msg: '密码错误'
                            }
                            return false;

                        }
                        //生成token，验证登录有效期
                        const token = jwt.sign({ userId: date[i].userId }, dbconfig.jwtSecret, { expiresIn: dbconfig.expireTime });
                        //    记录登陆日志
                        await INSERTlog(req.userName, date[i].userId, getNowTime(), ctx.ip, ctx.headers['user-agent']);
                        // 首次登陆判断
                        if (date[i].equipment == null || date[i].equipment == '') {
                            await updateUser(date[i].userId, token); //更新登陆状态
                            ctx.body = {
                                code: 1,
                                row: [{
                                    "token": token,
                                    "userName": req.userName,
                                    "power": date[i].power
                                }],
                                msg: '登陆成功',
                            }
                        } else {
                            if (verson('Bearer ' + date[i].equipment) == false) {
                                await updateUser(date[i].userId, token); //更新登陆状态
                                ctx.body = {
                                    code: 1,
                                    row: [{
                                        "token": token,
                                        "userName": req.userName,
                                        "power": date[i].power
                                    }],
                                    msg: '登陆成功',
                                }
                            } else {
                                if (req.zt == 0) {
                                    await updateUser(date[i].userId, token); //更新登陆状态
                                    ctx.body = {
                                        code: 1,
                                        row: [{
                                            "token": token,
                                            "userName": req.userName,
                                            "power": date[i].power
                                        }],
                                        msg: '登陆成功',
                                    }
                                } else {
                                    if (date[0].equipment != token) {
                                        ctx.body = {
                                            code: 0,
                                            zt: 1,
                                            msg: '登录的token与访问token不一致'
                                        }
                                    }
                                }

                            }

                        }
                    }
                }


            }
        }
        logsUtil.logResponse(ctx, req); //记录响应日志
    } catch (err) {
        ctx.response.status = 500;
        ctx.body = {
            code: 0,
            msg: '服务器跑了'
        }
        logsUtil.logError(ctx, err); //记录异常日志
    }

}
module.exports = login