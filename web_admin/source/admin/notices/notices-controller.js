function NoticesController(
    notices,
    types,
    Notice,
    AdminInfo,
    AsidePanel,
    Upload,
    API,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    notices.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.notices = _.map(response.content,
                           function(item) { return new Notice(item) })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() {
        vm.queryParams = {}
        $state.go($state.current, vm.queryParams, { inherit: false })
    }

    vm.types = types
    vm.type = vm.types[$stateParams.type - 1] ? vm.types[$stateParams.type - 1]['text'] : '全部'

    vm.typeChoices = _.map(_.clone(types, true), function(type) {
        type.click = 'vm.selectType(\'' + type.text + '\', ' + type.id + ')'
        delete type.id
        return type
    })
    vm.typeChoices.push({ divider: true })
    vm.typeChoices.push({ text: '全部', click: 'vm.selectType()' })

    vm.selectType = function(type, id) {
        vm.type = _.isUndefined(type) ? '全部' : type
        vm.queryParams.type = id
        vm.search()
    }

    //创建公告 修改公告
    vm.update = function(options) {
        if (options.type === 'update') {
            var initialParams = _.pick(options.data, [
                'id', 'noticeTitle', 'noticeType', 'imageUrl',
                'blogId', 'orgId', 'posterStartdate', 'posterEnddate'
            ])
        }
        vm.files = true;
        vm.notice = new Notice(initialParams);

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/notices/form.html'
        })
            .then(function(result) {
                result.aside.hide();
                if(!vm.notice.id){
                    return Notice.create(vm.notice)
                }else if(vm.notice.id){
                    return Notice.update(result.data.item)
                }
            })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))

    }

    //图片上传
    vm.upload = function(files) {
        if (files && files.length) {
            vm.files = files
            vm.form.$invalid = vm.uploading = true

            _.forEach(files, function(file) {
                Upload.upload({
                    url: API + '/console/2.0/notice/uploadNoticeImg',
                    headers: { 'Accept': 'text/plain, */*' },
                    file: file,
                    fileFormDataName: 'notice'
                })
                .progress(function(event) {
                    // TODO: maybe to implement a progress bar?
                    vm.progress = parseInt(100.0 * event.loaded / event.total)
                    console && console.info('进度：' + vm.progress + '%')
                })
                .success(function(response) {
                    vm.form.$invalid = vm.uploading = false
                    vm.notice.imageUrl = response.filePath
                })
                .error(function() {
                    vm.form.$invalid = vm.uploading = false
                    vm.files = undefined
                })
            })
        }
    }
}
