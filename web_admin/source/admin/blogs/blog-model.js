function BlogModel(API, $resource) {
    this.url = API + '/console/2.0/blog/:id'
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/blog/list'
    }

    this.actions.create = {
        method: 'POST',
        url: API + '/console/2.0/blog/create'
    }

    this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/blog/save'
    }

    this.actions.top = {
        method: 'GET',
        url: API + '/console/2.0/blog/top/:id/:orderID',
        params: { orderID: '@orderId' }
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/blog/delete/:id'
    }

    this.actions.batchDel = {
        method: 'POST',
        url: API + '/console/2.0/blog/delete'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
