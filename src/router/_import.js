{ // 主体
    "path": "/home",
    "name": "home",
    "redirect": "/home/box",
    "component": "views/home",
    "children": [{ // 用户管理
            "path": "box",
            "name": "box",
            "meta": {
                "title": "首页"
            },
            "component": "/views/box",
        },
        { // 用户管理
            "path": "userControl",
            "name": "UserControl",
            "meta": {
                "title": "用户管理",
                roles: ["0"]
            },
            "component": "/views/userContro",
        },
        { // 角色管理
            "path": "roleControl",
            "name": "RoleControl",
            "meta": {
                "title": "角色管理",
                roles: ["0"]
            },
            "component": "/views/roleControl",
        },
        { // 云空间
            "path": "cloud",
            "name": "Cloud",
            "meta": {
                "title": "云空间",
                roles: ["0"]
            },
            "component": "/views/cloud",
        },
        { // 云空间
            "path": "cloudNote",
            "name": "CloudNote",
            "meta": {
                "title": "云笔记",
                roles: ["0"]
            },
            "component": "/views/cloudNote",
        }
    ]
}