function BlogsController(
    blogs,
    Blog,
    Point,
    Tag,
    Notice,
    AdminInfo,
    AsidePanel,
    ConfirmModal,
    Upload,
    API,
    $scope,
    $http,
    $state,
    $stateParams
) {
    var vm = this

    this.batchDelIds = []

    blogs.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.blogs = _.map(response.content,
                         function(item) { return new Blog(item) })

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

    vm.show = function(blog) {
        vm.blog = blog

        AsidePanel.open($scope, {
            title: vm.blog.titleName,
            backdrop: true,
            contentTemplate: 'admin/blogs/show.html'
        })
    }

    vm.changeTop = function(blog) {
        vm.blog = blog

        ConfirmModal.open($scope, {
            title: '输入置顶顺序',
            contentTemplate: 'admin/blogs/top-order.html'
        })
        .then(function(result) {
            return vm.blog.$top()
        })
        .then(function(response) { $state.reload($state.current) })
        .catch(function (error) {
            alert(error.message);
        })
    }

    vm.addPoints = function(blog) {
        vm.point = { refId: blog.id }

        ConfirmModal.open($scope, {
            title: '输入发放积分的数量',
            contentTemplate: 'admin/blogs/add-points.html'
        })
        .then(function(result) { return Point.operate(vm.point) })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }

    var _tagType = _.find(AdminInfo.dictionaries.TAG_TYPE,
                          _.matchesProperty('systemName', '分享')).systemCode

    vm.getTags = function(name) {
        Tag.search({ tagName: name, tagType: _tagType }).$promise
        .then(function(response) {
                vm.tags = []
                _.forEach(response.content, function (item) {
                    if(!_.find(vm.currBlogTagVoList,{id: item.id})){
                        vm.tags.push(item);
                    }
                })
            })
    }

    vm.addTag = function(blog) {
//        vm.tag = { blogId: blog.id, type: _tagType }
        vm.currBlog = blog;
        if(!vm.currBlog.tagVoList){
            vm.currBlogTagVoList = [];
        }else{
            vm.currBlogTagVoList = _.clone(vm.currBlog.tagVoList);
        }

        ConfirmModal.open($scope, {
            title: '选择要添加的标签',
            contentTemplate: 'admin/blogs/add-tag.html'
        })
        .then(function(result) {
                return Tag.addTo({
                    blogId: vm.currBlog.id,
                    tagId: vm.currBlogTagVoList.map(function (item) {
                        return item.id;
                    }).join(','),
                    type: 'E'
                })
            })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }

    vm.linkNotice = function(blog) {
        vm.notice = new Notice({
            blogId: blog.id, noticeType: 1, orgId: blog.orgId, imageUrl: undefined
        })

        AsidePanel.open($scope, {
            title: '新建公告',
            contentTemplate: 'admin/blogs/link-notice.html'
        })
        .then(function(result) { return vm.notice.$create() })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }

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

    vm.push = function(blog) {
        vm.pushMessage = { refId: blog.id, contentText: '' }

        AsidePanel.open($scope, {
            title: '消息推送',
            contentTemplate: 'admin/blogs/push-message.html'
        })
        .then(function(result) {
            return $http.post(API + '/console/2.0/app/push', vm.pushMessage)
        })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }

    vm.delete = function(blog) {
        ConfirmModal.open($scope, { title: '确定要删除吗？' })
        .then(function(result) { return blog.$delete() })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }

    vm.showBatchDel = function () {
        ConfirmModal.open($scope, {
            title: '批量删除分享',
            contentTemplate: 'admin/blogs/batch-del.html'
        }).then(function(result) {
            return Blog.batchDel({idList: result.data}).$promise
        }).then(function(response) {
            $state.reload($state.current)
        }).catch(console.error.bind(console))
    }

    vm.batchDelSelectAll = (function () {
        var selectAll = false
        return function(){
            if(!selectAll){
                vm.batchDelIds = _.map(vm.blogs, function (item) {
                    return '' + item.id
                })
            }else{
                vm.batchDelIds = []
            }
            selectAll = !selectAll
        }
    })()

    //信息广播
    vm.broadcastForm = function(blog){
        $state.go('broadcast',{contentText:blog.streamContent,refId:blog.id})
    }
}
