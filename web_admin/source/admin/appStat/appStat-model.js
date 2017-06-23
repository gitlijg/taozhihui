function AppStatModel(API, $resource) {
    this.url = API + '/console/2.0/stream'
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.stat = {
        method: 'POST',
        url: API + '/console/2.0/app/stat'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
