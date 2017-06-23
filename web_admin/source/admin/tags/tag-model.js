function TagModel(API, $resource) {
    this.url = API + '/console/2.0/tag/:id'
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/tag/list'
    }

    this.actions.find = {
        method: 'POST',
        url: API + '/console/2.0/tag/queryByName'
    }

    this.actions.create = this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/tag/save'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/tag/delete/:id'
    }

    this.actions.addTo = {
        method: 'GET',
        url: API + '/console/2.0/tag/blog'
    }

    this.actions.merge = {
        method: 'POST',
        url: API + '/console/2.0/tag/merge'
    }

    this.actions.cancelHot = {
        url: API + '/console/2.0/tag/hot/cancel/:id'
    }

    this.actions.hot = {
        url: API + '/console/2.0/tag/hot/:id'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
