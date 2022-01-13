import request from '../js/axios' //引入封装好的axio
/**
 * 
 * @param {*} data 
 * password  密码
 * userName  用户名
 * @returns 
 */
function api_login(data) {  
    const url = '/reginters';
    return request({
        url: url,
        method: 'post',
        data
    })
}

export {
    api_login,
}