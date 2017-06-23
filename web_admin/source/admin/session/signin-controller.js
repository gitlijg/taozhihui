function SigninController(
    $http,
    API,
    User,
    Meta,
    store,
    $state,
    $timeout
) {
    var vm = this

    vm.session = {}

    vm.signin = function() {
        // 发起登录请求
        $http.post(API + '/weblogin', vm.session)

        // 根据 ID 查询登录用户信息
        .then(function(response) {
            response.data.imageDiyBgVo = JSON.parse(response.data.imageDiyBgVo)
            store.set('loginInfo', response.data)
            return User.getSelf().$promise
        })

        // 记住当前用户并跳转
        .then(function(user) {
            store.set('currentAdmin', user)
            $state.go('dashboard')
        })

        // 捕获错误
        .catch(function(rejection) {
            vm.flash = rejection
            $timeout(function() { delete vm.flash }, 3000)
        })
    }

    vm.meta = Meta
    vm.meta.thisYear = moment().year()
}
