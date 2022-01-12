const jwt = require('jsonwebtoken')
const config = require('../config/db')
/**
 * 校验token是否过期
 * */
//  decode  这个方法可以拿到所有信息
 function verson(token){
    let con =  jwt.verify(token.split(" ")[1],config.jwtSecret, (err, decoded) => {
        if (err) {
            // console.log(err)
            if(err.name == 'TokenExpiredError'){//token过期
                let str = {
                    iat:1,
                    exp:0,
                    msg: 'token过期'
                }
                return str;
            }else if(err.name == 'JsonWebTokenError'){//无效的token
                let str = {
                    iat:1,
                    exp:0,
                    msg: '无效的token'
                }
                return str;
            }
        }else{
            return decoded;
        }
    })
    if(con.iat<con.exp){
        return true //开始时间小于结束时间，代表token还有效
    }else{
        return false
    }
}

module.exports = verson