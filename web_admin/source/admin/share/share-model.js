function ShareModel(API, $resource) {
    this.url = API + '/console/2.0/activity/:id'
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/activity/list'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/activity/delete/:id'
    }

    this.actions.top = {
        method: 'GET',
        url: API + '/console/2.0/activity/top/:id/:orderID',
        params: { orderID: '@orderId' }
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
