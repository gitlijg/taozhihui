function GrouplogModel(API, $resource) {
    //this.url     = API + '/console/2.0/smsmonitor'
    this.params  = {}
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/statistics/groupUrlLog',
        isArray: true
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
