angular.module('lottery', [])

.config(function LotteryRoutes($stateProvider) {
    $stateProvider.state('lottery', {
        parent: 'admin',
        url: '/lottery',
        views: {
            'main@admin': {
                templateUrl: 'admin/lottery/form.html',
                controller: 'LotteryController as vm',
                resolve: {
                    lottery: function(Blog) {
                        return new Blog({
                            isSignup: 5, /* 抽奖 */
                            streamComefrom: 0, /* Web */
                            lottery: { lotteryOptionList: [{ orderId: 1 }] }
                        })
                    }
                }
            }
        }
    })
})

.controller('LotteryController', LotteryController)
