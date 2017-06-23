function StreamModel($http, API, $resource) {
    var transforms = $http.defaults.transformResponse

    this.url = API + '/console/2.0/stream'
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/stream/queryStream'
    }

    this.actions.delete = {
        method: 'GET',
        url: API + '/console/2.0/stream/delete/:id'
    }

    var Model = $resource.call(this, this.url, this.params, this.actions)

    Object.defineProperties(Model.prototype, {
        status: {
            enumerable: true,
            get: function() {
                var isUndefined = _.isUndefined(this.streamType)
                var isDrafted = this.streamType === 'D'

                if (isUndefined || isDrafted) { return '未发表' }
                if (this.streamType === 'M') { return '已发表' }
                if (this.streamType === 'A') { return '待审批' }

                return this.streamType
            },
            set: function(value) { this.streamType = value }
        }
    })

    return Model
}
