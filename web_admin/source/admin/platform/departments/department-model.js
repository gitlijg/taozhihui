function DepartmentModel(API, $resource) {
    this.url     = API + '/console/2.0/department/:id'
    this.params  = {}
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/department/list'
    }

    this.actions.save = {
        method: 'POST',
        url: API + '/console/2.0/department/save'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/department/delete/:id'
    }

    this.actions.users = {
        method: 'POST',
        url: API + '/console/2.0/department/user'
    }

    this.actions.addUser = {
        method: 'GET',
        url: API + '/console/2.0/department/member/add/:deptId/:userId'
    }

    this.actions.removeUser = {
        method: 'GET',
        url: API + '/console/2.0/department/member/remove/:deptId/:userId'
    }

    this.actions.idleUsers = {
        method: 'GET',
        url: API + '/console/2.0/department/idleMember',
        isArray: true
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
