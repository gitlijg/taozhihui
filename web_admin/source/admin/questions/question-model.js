function QuestionModel($http, API, $resource) {
    var transforms = $http.defaults.transformResponse

    this.url = API + '/console/2.0/question'
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/question/list'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/question/delete/:id'
    }

    this.actions.top = {
        method: 'GET',
        url: API + '/console/2.0/question/top/:id/:orderID',
        params: { orderID: '@orderId' }
    }

    var Model = $resource.call(this, this.url, this.params, this.actions)

    Object.defineProperties(Model.prototype, {
        status: {
            enumerable: true,
            get: function() {
                if (this.isDraft === 0) { return '已发表' }
                else { return '未发表' }
            },
            set: function(value) { this.isDraft = value }
        }
    })

    return Model
}
