function ConfirmModal() {
    this.defaults = {
        html: true,
        templateUrl: 'components/angular-strap/confirm.html',
        contentTemplate: 'components/angular-strap/confirm-modal.html'
    }

    this.$get = function($q, $modal) {
        return {
            open: function _openConfirmModal(parentScope, options) {
                var _scope = parentScope.$new()
                _scope.modalModel = {}

                var _options = angular.extend(_.clone(this.defaults), options)
                _options.scope = _scope

                var _modal = $modal(_options)

                return $q(function(resolve, reject) {
                    _scope.modalModel.confirm = function(data, immediateHide) {
                        if (immediateHide) {
                            _modal.hide()
                            resolve({data: data})
                        } else resolve({data: data, modal: _modal})
                    }

                    _scope.modalModel.cancel = function(reason, immediateHide) {
                        if (immediateHide) {
                            _modal.hide()
                            reject({reason: reason})
                        } else reject({reason: reason, modal: _modal})
                    }
                })
            }.bind(this)
        }
    }
}
