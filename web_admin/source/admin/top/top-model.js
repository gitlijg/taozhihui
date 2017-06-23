function TopModel(API, $resource) {
    this.url = API + '/console/2.0/blog/:id'
    this.actions = {}

    this.actions.search = {
        url: API + '/console/2.0/blog/top/list',
        isArray: true
    }

    this.actions.cancle = {
        url: API + '/console/2.0/blog/top/cancel/:id'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
