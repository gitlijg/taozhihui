function RoleModel(API, $resource) {
    this.url     = API + '/console/2.0/role/:id'
    this.params  = {}
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/role/list'
    }

    this.actions.permissions = {
        method: 'GET',
        url: API + '/console/2.0/role/allPermissions',
        isArray: true
    }

    this.actions.save = {
        method: 'POST',
        url: API + '/console/2.0/role/save'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/role/delete/:id'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
