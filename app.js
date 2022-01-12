const Koa = require('koa');
const cors = require('koa2-cors');//跨域
const cluster = require('cluster');  //多线程
const koajwt = require('koa-jwt') // koa提供的jwt中间件
const app = new Koa();
const dbConfig = require('./config/db');  //数据库配置和服务端口
require('console-color-mr');  //颜色模块
const koaBody = require('koa-body');  //处理post请求参数
app.use(koaBody({
  multipart: true, // 支持文件上传
}));
app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      // console.log(ctx)
      if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
      }
      return 'http://10.168.31.11:8888'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

const helmet = require("koa-helmet");  //提高网站安全性
app.use(helmet());
// 所有接口访问都必须进过验证
const {userid,updateUser} = require('./sql/login/login');
const jsonwebtoken = require('jsonwebtoken');
const verson = require('./util/token'); //验证token
app.use(async (ctx, next) => {
   try{
     let tokens  = ctx.headers.authorization;
    //  过滤登陆和注册接口
     if(ctx.url == '/api/login' || ctx.url == '/api/reginters'){   
      //  放行
       await next();
     }else{
       if(tokens){
          let data = jsonwebtoken.decode(tokens.split(" ")[1]);
          let zt = await userid(data.userId);
          // 验证所有接口访问的token 如果为空和null 就放行 证明用户没登陆过
          if(zt[0].equipment == null || zt[0].equipment == ''){
            // await next();
            ctx.body = {
              code: 0,
              zt:1,
              msg: '用户未登陆'
          }
          }else{
            // 验证返回的token有效切未过期  与数据库不一致返回前端状态给前端判断是否重新登录或者继续用旧的token
             if(zt[0].equipment != tokens.split(" ")[1]){
                ctx.body = {
                    code: 0,
                    zt:1,
                    msg: '登录的token与访问token不一致'
                }
             }else{
              //  与数据库一致就放行
                await next();
             }
 
          }
       }
     }
   }catch(err){
    let token  = ctx.headers.authorization;
    // jwt.verify
      if(token){
        if(verson(token) == false){   //判断token是否过期 false 为过期, true 为未过期
          let date = jsonwebtoken.decode(token.split(" ")[1]);
          updateUser(date.userId,'');//更新登陆状态
          ctx.status = 401;
           ctx.body = {
               code: 0,
               zt:0,
               msg: 'token已过期'
           }
      }
    } else {
      ctx.status = 401;
      ctx.body = {
          code: 0,
          msg: '请携带token访问'
      }
    }
  }
  
});



// 配置过滤token 白名单
const jwtarr = require('./config/jwtarr');
app.use(koajwt({secret:dbConfig.jwtSecret}).unless({
  path:jwtarr
}))


// 捕获全局请求不存在的接口返回404
app.use(async (ctx, next) => {
  await next();
  if (parseInt(ctx.status) === 404) {
    ctx.response.status = 404;
    ctx.body = {
      code: 0,
      msg: '404'
    };
  } else if (parseInt(ctx.status) === 500) {
    ctx.response.status = 500;
    ctx.body = {
      code: 0,
      msg: '服务器跑了'
    };
  }
})


// 配置解析请求中间件
const router = require('./routers/router')  //路由模块
app.use(router.routes())  /*启动路由*/
  .use(router.allowedMethods())

// 字符串转换
const json = require('koa-json');
app.use(json());


// 捕获错误logger 记录
const logsUtil = require('./config/logs');
const { format } = require('path');
app.on('error', (err, ctx) => {
  logsUtil.logError(ctx, err)
  console.error('服务器报错，请查看日志错误信息', err, ctx)
});


/**
 * 多线程
 * cluster 用于监听 process(child) 子进程触发的各种事件
 * worker 在主进程中获取，用于和自身通信。当子进程触发事件时，会返回当前的 worker 以及相关的信息到主进程相应的事件中
 * process(parent) 主进程本身的进程实例，在通信过程中基本没有用到
 * process(child) 子进程本身的实例，只能在子进程获取用于监听自身的事件
 */

//启用轮叫调度，实现负载均衡
cluster.schedulingPolicy = cluster.SCHED_RR;
if (cluster.isMaster) {//主进程
  const numCPUs = require('os').cpus().length;
  // 循环 fork 任务 CPU i5-7400 四核四进程
  // 开启多个子进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`主进程运行在 ${worker.process.pid} `.red);
    // 主进程退出，子进程全部退出
    for (let pid in worker) {
      worker[pid].kill();
    }
  });
} else {
  //监听端口
  app.listen(`${dbConfig.host}`, () => {
    console.info(`子进程运行在${process.pid}`)
  });
}
