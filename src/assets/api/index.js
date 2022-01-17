import request from '../js/axios' //引入封装好的axio
/**
 * 登陆
 * @param {*} data 
 * password  密码
 * userName  用户名
 * @returns 
 */
function api_login(data) {  
    const url = '/login';
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
    const url = '/reginters';
    return request({
        url: url,
        method: 'post',
        data
    })
}

export {
    api_login,
    api_reginters
}