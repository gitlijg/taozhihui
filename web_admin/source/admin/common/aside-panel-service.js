function AsidePanel() {
    this.defaults = { html: true }

    this.$get = function($q, $aside) {
        return {
            open: function _showAsidePanel(parentScope, options) {
                var _scope = parentScope.$new()
                _scope.asideModel = {}

                var _options = angular.extend(_.clone(this.defaults), options)
                _options.scope = _scope

                var _aside = $aside(_options)

                var deferred = $q.defer()

                return $q(function(resolve, reject) {
                    _scope.asideModel.confirm = function(data, immediateHide) {
                        if (immediateHide) {
                            _aside.hide()
                            resolve({data: data})
                        } else resolve({data: data, aside: _aside})
                    }

                    _scope.asideModel.cancel = function(reason, immediateHide) {
                        if (immediateHide) {
                            _aside.hide()
                            reject({reason: reason})
                        } else reject({reason: reason, aside: _aside})
                    }
                })
            }.bind(this)
        }
    }
}
