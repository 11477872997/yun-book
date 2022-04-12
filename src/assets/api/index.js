import request from '../js/axios' //引入封装好的axio
/**
 * 登陆
 * @param {*} data 
 * password  密码
 * userName  用户名
 * @returns 
 */
function api_login(data) {  
    const url = '/api/login';
    return request({
        url: url,
        method: 'post',
        data
    })
}

/**
 * 注册
 * @param {*} data 
 * password  密码
 * userName  用户名
 * @returns 
 */
 function api_reginters(data) {  
    const url = 'api/reginters';
    return request({
        url: url,
        method: 'post',
        data
    })
}
function api_men(data) {  
    const url = '/json/men.json';
    return request({
        url: url,
        method: 'get',
        data
    })
}
export {
    api_login,
    api_reginters,
    api_men
}