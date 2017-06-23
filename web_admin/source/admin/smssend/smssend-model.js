function SmssendModel(API, $resource) {
    this.params = { id: '@id' }
    this.actions = {}

    this.actions.search = {
        method: 'POST',
        url: API + '/console/2.0/smsmonitor/list'
    },
    this.actions.send = {
        method: 'POST',
        url: API + '/console/2.0/smsmonitor/sms/all'
    }

    var Model = $resource.call(this, this.url, this.params, this.actions)

    Object.defineProperties(Model.prototype, {
        status: {
            enumerable: true,
            get: function() {
                var isUndefined = _.isUndefined(this.mark)
                var isDrafted = this.mark.Contains('S')

                if (isUndefined || isDrafted) { return '成功' }
                if (this.mark.Contains('F')) { return '失败' }
                if (this.mark.Contains('W')) { return '等待' }
                if (this.mark.Contains('C')) { return '关闭' }

                return this.mark
            },
            set: function(value) { this.mark = value }
        }
    })

    return Model

}
