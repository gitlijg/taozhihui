function QuestionsController(
    initialList,
    Question,
    User,
    Sorter,
    ConfirmModal,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    initialList.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.questions = _.map(response.content,
                             function(item) { return new Question(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    vm.top = function (item) {
        vm.blog = item;
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

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }

    vm.getUsers = function(value) {
        User.search({ loginName: value, aliasName: value }).$promise
        .then(function(response) { vm.users = response.content })
    }

    vm.delete = function(question) {
        ConfirmModal.open($scope, { title: '确定要删除吗？' })
        .then(function(result) { return question.$delete() })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }
}
