function AdminController(
    Meta,
    AdminInfo,
    RoleChecker,
    $http,
    API,
    store,
    $state,
    $rootScope
) {
    var admin = this

    // 把 API 暴露出来
    admin.api = API
    $rootScope.api = API

    admin.meta = Meta

    // 获取登录和当前管理员信息
    admin.loginInfo    = AdminInfo.loginInfo
    admin.currentAdmin = AdminInfo.currentAdmin

    // 处理当前管理员的角色信息
    var role         = new RoleChecker(admin.currentAdmin.roleNames);
    admin.roles      = role.roles;
    admin.isAdmin    = role.isAdmin;
    admin.isSubAdmin = role.isSubAdmin;
    admin.isReadOnly = role.isReadOnly; //只读

    // 管理员头像下方快捷菜单
    admin.adminMenu = [{
        'text': '退出登录',
        'click': 'admin.signout()',
        'prefix': 'fa-power-off'
    }]

    // 退出登录
    admin.signout = function signOut() {
        $http.get(API + '/logoutCas')
        store.remove('loginInfo')
        store.remove('currentAdmin')
        $state.go('session.signin')
    }

    // 主菜单项目列表
    var _groups = _.groupBy(AdminInfo.permissions, 'type')
    admin.menus =  _.forEach(_groups[0], function(group) {
        group.items = [];

        for(var j = 0;j < admin.currentAdmin.roleList.length;j++){
            var role = admin.currentAdmin.roleList[j];
            if(role.permissions.indexOf(group.permission + ':view') == -1){
                return;
            }
        }
        _.forEach(_groups[group.position],function(item){
            for(var i = 0;i < admin.currentAdmin.roleList.length;i++){
                var role = admin.currentAdmin.roleList[i];
                if(role.permissions.indexOf(item.permission + ':view') != -1
                || role.permissions.indexOf(item.permission + ':edit') != -1){
                    group.items.push(item);
                    break;
                }
            }
        })
    })
    // AdminInfo.permissions.$promise.then(function(response) {
    //     return 
    // }).then(function(groups) {
    // })

    // 跟踪当前处于 active 的菜单项
    admin.activeMenu = -1

    // 判断目标菜单项是否为当前激活
    admin.isActiveMenu = function isActiveMenu(index) {
        return (admin.activeMenu === index)
    }

    // 设置目标菜单项成为当前激活项
    admin.setActiveMenu = function setActiveMenu(index) {
        if (_.isUndefined(index)) {
            admin.activeMenu = -1
        } else {
            admin.activeMenu = (admin.activeMenu === index) ? -1 : index
        }
    }
}
