const Router = require('koa-router');
const router = new Router({
    prefix: '/api' //统一加个前缀
});


const reginters = require('../api/login/register');
const login = require('../api/login/login');
const verify = require('../api/verification');





//注册
router.post('/reginters',reginters);
// 登录
router.post('/login',login);
//验证
router.post('/verify',verify);





module.exports = router
