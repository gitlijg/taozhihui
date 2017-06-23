angular.module('sina', [])

    .config(function SinaRoutes($stateProvider) {
        $stateProvider
            .state('sina', {
                url: '/sina-list',
                parent: 'admin',
                views: {
                    'main@admin': {
                        templateUrl: 'admin/sina/list.html',
                        controller: 'SinaListController as vm'
                    }
                }
            })
    })

    .service('Sina', SinaModel)

    .controller('SinaListController', SinaListController)
