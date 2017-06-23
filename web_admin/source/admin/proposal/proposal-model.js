function ProposalModel(API, $resource) {
    this.url = API + '/console/2.0/suggestion'
    this.params = {}
    this.actions = {}

    this.actions.roleList = {
        method: 'GET',
        url: API + '/console/2.0/suggestion/roleList',
        isArray: true
    }

    this.actions.userRole = {
        method: 'GET',
        url: API + '/console/2.0/suggestion/userrole',
        isArray: true
    }

    this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/suggestion/userrole/save'
    }

    this.actions.options = {
        method: 'GET',
        url: API + '/console/2.0/suggestion/option',
        isArray: true
    }

    this.actions.saveOption = {
        method: 'POST',
        url: API + '/console/2.0/suggestion/option/save'
    }

    this.actions.deleteOption = {
        method: 'GET',
        url: API + '/console/2.0/suggestion/option/del/:id'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
