function OrganizationModel(API, $resource) {
    this.url     = API + '/console/2.0/org/:id'
    this.params  = {}
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/org/list'
    }

    this.actions.getAll = {
        method: 'GET',
        url: API + '/console/2.0/org/findAllOrgs',
        isArray: true
    }

    this.actions.current = {
        method: 'GET',
        url: API + '/console/2.0/org/self'
    }

    this.actions.create = {
        method: 'POST',
        url: API + '/console/2.0/org/create'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/org/delete/:id'
    }

    this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/org/update'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
