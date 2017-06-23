function TeamsController(
    teams,
    Team,
    User,
    Sorter,
    AsidePanel,
    ConfirmModal,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    teams.$promise.then(function(response) {
        vm.isLoaded = response.$resolved
        vm.teams = _.map(response.content,
                         function(item) { return new Team(item) })

        vm.sorter = Sorter.init({
            order: response.sort.property,
            reverse: !response.sort.ascending
        })

        vm.queryParams = _.clone($stateParams)
        vm.totalItems = response.totalElements
        vm.totalPages = response.totalPages
    })

    $scope.$watchCollection('vm.' + $state.current.name, function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })

    vm.search = function() { $state.go($state.current, vm.queryParams) }
    vm.reset = function() { vm.queryParams = {}; vm.search() }

    vm.action = function(options) {
        vm.formMode = options.type

        if (options.type === 'create') {
            var initialParams = { isOpen: 1, isWrite: 1, userList: [] }
        }

        if (options.type === 'update') {
            var initialParams = _.pick(
                options.data,
                ['id', 'createId', 'teamName', 'teamDesc', 'isOpen', 'isWrite', 'userList']
            )
        }

        vm.team = new Team(initialParams)

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/teams/form.html'
        })
        .then(function(result) {
            vm.team.userList = vm.team.groupUserListByID()
            return vm.team['$' + result.data.type]()
        })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }

    // TODO: angular-strap's typeahead 在这里和 angular 1.4 有兼容性 bug，等待修复
    // vm.searchUsers = function(value) {
    //     return User.search({ loginName: value }).$promise
    //     .then(function(response) { return response.content })
    // }

    // 选择成员
    vm.selectedUsers = []
    vm.searchUsers = function(value) {
        vm.doneSearch = false

        User.search({ loginName: value, aliasName: value }).$promise
        .then(function(response) {
            vm.doneSearch = response.$resolved
            vm.candidates = response.content
        })
    }

    // 不能删除群组的创建者
    vm.lockTeamCreator = function(user) {
        return _.isEqual(user.id, vm.team.createId)
    }

    // 不能选择已选中的成员
    vm.disableSelected = function(user, selected) {
        return _.find(selected, _.matchesProperty('id', user.id))
    }

    // 删除群组
    vm.delete = function(options) {
        ConfirmModal.open($scope, { title: options.text })
        .then(function(result) { return Team.delete({id: options.data.id}) })
        .then(function(response) { $state.reload($state.current) })
        .catch(console.error.bind(console))
    }
}
