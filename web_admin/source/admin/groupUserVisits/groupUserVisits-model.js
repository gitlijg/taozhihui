function GroupUserVisitsModel(API, $resource) {
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.groupUserVisitsHours = {
        url: API + '/console/2.0/statistics/groupTimeVisits',
        method: 'POST',
        isArray:true
    }

    return $resource.call(this, this.url, this.params, this.actions)

}
