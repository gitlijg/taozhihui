angular.module('sms', [])

.config(function SMSRoutes($stateProvider) {
    $stateProvider

    .state('sms', { abstract: true, parent: 'admin', url: '/sms' })

    .state('sms.list', {
        url: '/list?{content:string}&{mark:string}&{receiver:int}&{sender:string}&{page:int}${size:int}',
        params: {
            content: null,
            mark: null,
            receiver: null,
            sender: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/sms/list.html',
                controller: 'SMSListController as vm',
                resolve: {
                    smsList: function(SMS, $stateParams) {
                        return SMS.search({
                            content: $stateParams.content,
                            mark: $stateParams.mark,
                            receiver: $stateParams.receiver,
                            sender: $stateParams.sender,
                            pageInfo: {
                                pageSize: $stateParams.size,
                                pageNumber: $stateParams.page
                            }
                        })
                    }
                }
            }
        }
    })
})

.service('SMS', SMSModel)

.controller('SMSListController', SMSListController)
