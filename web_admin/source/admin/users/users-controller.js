function UsersController(
    users,
    User,
    roles,
    Department,
    AdminInfo,
    Sorter,
    AsidePanel,
    Upload,
    API,
    $scope,
    $state,
    $stateParams,
    $q,
    $window
) {
    var vm = this

    vm.loginType = '全部'

    vm.loginTypeList = [
        {
            text: '已登录',
            click: 'vm.switchLoginType("Y")'
        },
        {
            text: '全部',
            click: 'vm.switchLoginType("")'
        },
        {
            text: '未登录',
            click: 'vm.switchLoginType("N")'
        }
    ]

    users.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.users = _.map(response.content,
                         function(item) { return new User(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages

        if($stateParams.lastLoginTime == 'Y'){
            vm.loginType = '已登录'
        }else if($stateParams.lastLoginTime == 'N'){
            vm.loginType = '未登录'
        }else{
            vm.loginType = '全部'
        }
    })

    vm.roles = roles

    vm.switchLoginType = switchLoginTypeFn;

    function switchLoginTypeFn(type){
        vm.queryParams.lastLoginTime = type;
        $state.go($state.current, vm.queryParams)
    }

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function(parameter) { vm.queryParams = {}; vm.search() }

    vm.getDepartments = function(name) {
        Department.search({
            orgId: AdminInfo.currentAdmin.userInfo.orgId,
            departmentName: name
        }).$promise.then(function(response) { vm.departments = response.content })
    }

    vm.register = function() {
        vm.formMode = 'create'

        // 初始化新用户的缺省属性值 & 创建模型
        var _defaultUserProperties = {
            allowLoginFromMobile: 1,
            receiveMessage: 1,
            viewPhone: 1,
        }
        vm.user = new User(_defaultUserProperties)

        AsidePanel.open($scope, {
            title: '添加用户',
            contentTemplate: 'admin/users/register.html'
        })
        .then(function(result) { return vm.user.$register() })
        .then(function(result) { $state.reload() })
        .catch(console.error.bind(console))
    }

    // 如果手机登录选择禁止，就置否接受推送
    $scope.$watch('vm.user.allowLoginFromMobile', function(newValue) {
        if ($window.parseInt(newValue, 10) === 0) { vm.user.receiveMessage = 0 }
    })

    // 如果没填手机，则置否公开手机
    $scope.$watch('vm.user.phoneNumber', function(newValue) {
        if (newValue && _.isEmpty(newValue)) { vm.user.viewPhone = 0 }
    })

    // 上传头像
    vm.upload = function(files) {
        if (files && files.length) {
            vm.files = files
            vm.form.$invalid = vm.uploading = true

            _.forEach(files, function(file) {
                Upload.upload({ url: API + '/upload', file: file })
                .progress(function(event) {
                    // TODO: maybe to implement a progress bar?
                    vm.progress = parseInt(100.0 * event.loaded / event.total)
                    console && console.info('进度：' + vm.progress + '%')
                })
                .success(function(response) {
                    vm.user.imageId = response[0].id
                    vm.form.$invalid = vm.uploading = false
                })
                .error(function() {
                    vm.files = undefined
                    vm.form.$invalid = vm.uploading = false
                    debugger
                })
            })
        }
    }

    // 批量操作菜单
    vm.importDropdown = [{
        'text': '下载用户信息表格',
        'href': '/downloadFile/avatar/register_user_import.xls',
        'prefix': 'fa-file-excel-o'
    }]

    vm.import = function(files) {
        if (_.isUndefined(files) || _.isEmpty(files)) { return }

        vm.files = files

        // 开始上传时给出提示
        vm.importing   = true
        vm.serverError = null

        _.forEach(files, function(file) {
            var importProcess = Upload.upload({
                url: API + '/console/2.0/user/createUserByExcel',
                headers: { 'Accept': 'text/plain, */*' },
                file: file,
                fileFormDataName: 'batchUsers'
            })
            .progress(function(event) {
                // TODO: maybe to implement a progress bar?
                vm.progress = parseInt(100.0 * event.loaded / event.total)
                console && console.info('进度：' + vm.progress + '%')
            })
            .success(function(data) {
                vm.importing = false
                $state.reload($state.current.name)
            })
            .catch(_processImportErrorMessage)
        })
    }

    function _processImportErrorMessage(error) {
        vm.serverError = error
        vm.serverError.message = vm.serverError.message.replace(/\r\n/, '')
    }

    vm.exportPath = API + '/console/2.0/user/export'

    vm.update = function(user) {
        user.$get().then(function(response) {
            vm.user = new User(response.userInfo)
            vm.user.roleIds = _.map(response.roleList,
                                     function(role) { return '' + role.id })
            vm.user.roleNames = response.roleNames

            return vm.user
        })
        .then(function(user) {
            AsidePanel.open($scope, {
                title: '更新用户',
                contentTemplate: 'admin/users/update.html'
            })
            .then(function(result) {
                if (result.data.type === 'password') {
                    return User.updatePassword(
                        _.pick(user, ['id', 'plainPassword'])
                    )
                } else if(result.data.type === 'integral'){
                    var params = {
                        receiver: user.id,
                        integral: user._integral,
                        remark: user._integralRemark
                    }
                    return User.integral(params);
                }else if(result.data.type === 'role'){
                    return User.updateRole({
                        id: user.id,
                        roleList: _.map(user.roleIds, function (result) {
                            return {id: result}
                        })
                    },function(result){
                        if(result.code != 10000){
                            alert(result.msg);
                        }
                    },function(result){
                        alert(result.message);
                    })
                }else {
                    var updateParams = _.pick(user, [
                        'id', 'signature', 'qq', 'weixin',
                        'phoneNumber', 'gender', 'birthdayFormat',
                        'userName', 'trueName', 'title', 'email',
                        'address', 'imageId', 'website', 'receiveMessage',
                        'allowLoginFromMobile', 'viewPhone', 'level','departmentId','recommend'
                    ])

                    updateParams.birthday = updateParams.birthdayFormat
                    delete updateParams.birthdayFormat

                    return User.updateInfo(updateParams)
                }
            })
            .then(function(result) { $state.reload() })
            .catch(console.error.bind(console))
        })
    }

    vm.toggle = function(user) {
        var isLock = (user.isLock === 0) ? 1 : 0
        user.$toggle({ isLock: isLock })
        .then(function(response) { $state.reload() })
    }

    vm.delete = function(user) {
    }
}
