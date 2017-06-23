function TagsController(
    tags,
    Tag,
    Sorter,
    AdminInfo,
    AsidePanel,
    ConfirmModal,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    tags.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.tags = _.map(response.content,
                        function(item) { return new Tag(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    vm.setHot = function (tag) {
        var action = tag.hotFlag ? 'cancelHot' : 'hot';
        Tag[action]({id: tag.id},function (result) {
            tag.hotFlag = !tag.hotFlag;
        })
    }

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }

    function _extractType(code) {
        if (code === null) { return '全部' }
        return _.find(vm.types, _.matchesProperty('code', code))['text']
    }

    // 在列表中转换类型的显示
    vm.filteredTagType = _extractType

    // 类型列表及当前选中类型
    vm.types = _.map(AdminInfo.dictionaries.TAG_TYPE, function(type) {
        return { code: type.systemCode, text: type.systemName }
    })
    vm.type = _extractType($stateParams.type)

    // 构造选择类型的下拉列表
    vm.typeList = _.map(_.clone(vm.types, true), function(type) {
        type.click = 'vm.selectType(\'' + type.text + '\', \'' + type.code + '\')'
        return type
    })
    vm.typeList.push({ divider: true })
    vm.typeList.push({ text: '全部', click: 'vm.selectType()' })

    // 选择类型时的逻辑
    vm.selectType = function(type, code) {
        vm.type = _.isUndefined(type) ? '全部' : type
        vm.queryParams.type = code
        vm.search()
    }

    vm.action = function(options) {
        if (options.type === 'create') {
            var initialParams = { 'tagType': 'B', 'orderId': '0.0', 'orgFlag': 'O' }
        }

        if (options.type === 'update') {
            var initialParams = _.pick(options.data, [
                'id', 'tagName', 'tagDesc', 'orderId', 'tagSyno', 'tagType', 'orgFlag'
            ])
        }

        vm.formMode = options.type
        vm.tag = new Tag(initialParams)
        vm.mergeTag = {searchList: [],list: []}

        vm.searchTags();

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/tags/form.html'
        })
        .then(function(result) {
            result.aside.hide()
            if(result.data.type == 'merge'){
                return Tag.merge({
                    originalIdList: vm.mergeTag.list,
                    targetId: vm.tag.id
                })
            }else{
                return vm.tag['$' + result.data.type]()
            }
        })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }

    //标签合并搜索标签
    vm.searchTags = function (){
        return Tag.search({
            pageInfo: {pageNumber: 1,pageSize: 100000}
        }).$promise.then(function(result){
            vm.mergeTag.searchList = result.content;
        });
    }

    vm.delete = function(tag) {
        ConfirmModal.open($scope, { title: '确定删除吗？' })
        .then(function(result) { return tag.$delete() })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }
}
