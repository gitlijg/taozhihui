function ReportModel(API, $resource) {
    this.url = API + '/console/2.0/report/:id'
    this.params = {}
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/report/list'
    }

    this.actions.info = {
        url: API + '/console/2.0/blog/report/:reportRefId/:reportRefType',
        isArray: true
    }

    var constructor = $resource.call(this, this.url, this.params, this.actions)

    return constructor
}
