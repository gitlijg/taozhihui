function NoticeModel(API, $resource) {
    this.url = API + '/console/2.0/notice/:id'
    this.params = {}
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/notice/list'
    }

    this.actions.types = {
        method: 'GET',
        url: API + '/console/2.0/notice/type'
    }

    this.actions.create = this.actions.update = {
        method: 'POST',
        url: API + '/console/2.0/notice/save'
    }

    return $resource.call(this, this.url, this.params, this.actions)
}
