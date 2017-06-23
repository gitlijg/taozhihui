function SessionsModel(API, $resource) {
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.sessions = {
        url: API + '/console/2.0/sessions',
        isArray:true
    }

    return $resource.call(this, this.url, this.params, this.actions)

}
