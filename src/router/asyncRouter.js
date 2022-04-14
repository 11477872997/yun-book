
// Layout 组件是项目中的主页面，切换路由时，仅切换Layout中的组件
import Layout from '@/views/home'
export function getAsyncRoutes(routes) {
    const res = []
    // 定义路由中需要的自定名
    const keys = ['path', 'name', 'children', 'redirect', 'meta', 'alwaysShow','hidden']
    // 遍历路由数组去重组可用的路由
    routes.filter(item => {
        const newItem = {};
        if (item.component) {
            // 判断 item.component 是否等于 'Layout',若是则直接替换成引入的 Layout 组件
            if (item.component === 'Layout') {
                newItem.component = Layout
            } else {
                newItem.component =  loadView(item.component );  
            }
        }
        for (const key in item) {
            if (keys.includes(key)) {
                newItem[key] = item[key]
            }
        }
        // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
        if (newItem.children && newItem.children != null  && newItem.children.length) {
            newItem.children = getAsyncRoutes(item.children)
        }
        res.push(newItem)
    })
    // 返回处理好且可用的路由数组
    return res
}
// 添加子路由
 const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return() => require.ensure([], (require) => require(`@/${view}`))
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/${view}`)
  }
}


// // Layout 组件是项目中的主页面，切换路由时，仅切换Layout中的组件
// import Layout from '@/views/home'
// export function getAsyncRoutes(routes) {
//     const arr = []
//     // 定义路由中需要的自定名
//     const keys = ['path', 'name', 'children', 'redirect', 'meta', 'alwaysShow','hidden']
//     // 遍历路由数组去重组可用的路由
//     routes.filter(item => {
//         let child = []  // 子路由数据格式处理
//        if(item.component === 'Layout'){
//         arr.push({
//             name: item.name,
//             path: item.path,
//             redirect: item.redirect,
//             children: child,
//             component:Layout // 开发中遇到问题，不能使用纯变量，需要字符串拼接才可以，要不然同样的地址报错。
//           })
//        }
       
//        item.children.filter((val) => {
//         child.push({
//           name: val.name,
//           path: val.path,
//           component: () => import(`@/views/${val.component}`) // 开发中遇到问题，不能使用纯变量，需要字符串拼接才可以，要不然同样的地址报错。
//         })
//       }) 
//     })
//     // 返回处理好且可用的路由数组
//     return arr
// }

