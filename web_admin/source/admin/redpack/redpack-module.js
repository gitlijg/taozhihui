angular.module('redpack', [])

.config(function RedpackRoutes($stateProvider) {
    $stateProvider.state('redpack', {
        parent: 'admin',
        url: '/redpack',
        views: {
            'main@admin': {
                templateUrl: 'admin/redpack/form.html',
                controller: 'RedpackController as vm',
                resolve: {
                    redpack: function(Blog) {
                        return new Blog({
                            isSignup: 6, /* 红包 */
                            streamComefrom: 0, /* Web */
                            redPacket: { integralTotal: 100 }
                        })
                    }
                }
            }
        }
    })
})

.controller('RedpackController', RedpackController)
