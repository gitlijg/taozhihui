function PointModel(API, $resource) {
    this.url = API + '/console/2.0/integral'
    this.params = {}
    this.actions = {}

    this.actions.getList = {
        method: 'GET',
        url: API + '/console/2.0/integral/config/list',
        isArray: true
    }

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/integral/total/list'
    }

    this.actions.create = this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/integral/config/save'
    }

    this.actions.operate = {
        method: 'POST',
        url: API + '/console/2.0/integral/total/maintain'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
