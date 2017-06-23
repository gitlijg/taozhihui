function ProposalRolesController(
    userRoles,
    departments,
    User,
    Proposal,
    $scope,
    $state,
    $stateParams
) {
    var vm = this

    vm.userRoles = userRoles.value()
    vm.userLists = []

    vm.getUsers = function(name, role) {
        User.find({
            id: role.departmentId || undefined,
            term: name || role.suggestUserName || ''
        }).$promise.then(function(response) { vm.userLists[role.id] = response })
    }

    departments.$promise.then(function(response) {
        vm.departments = response.content
    })

    vm.matchRole = function(id) {
        var role = _createRole(id) || new Proposal({ departmentId: id })
        role.suggestRoleCodeList = ['DB', 'CB', 'DD']
        return role
    }

    function _createRole(id) {
        return _(vm.userRoles[1]).find(_.matchesProperty('departmentId', id))
    }

    vm.update = function(role) {
        Proposal.update(_composeParams(role)).$promise
        .then(function(response) { $state.reload() })
    }

    function _composeParams(role) {
        var params = _.pick(role, ['departmentId', 'userId'])

        if (_.isNull(role.suggestRoleCodeList)) {
            params.suggestRoleCodeList = [role.suggestRoleCode]
        } else {
            params.suggestRoleCodeList = role.suggestRoleCodeList
        }

        return params
    }
}
