angular.module('system', [])

.config(function ($stateProvider) {
    $stateProvider

    .state('system', { abstract: true, parent: 'admin', url: '/system' })

    .state('system.config', {
        url: '/config',
        views: {
            'main@admin': {
                templateUrl: 'admin/system/config.html',
                controller: 'SystemConfigController as vm',
                resolve: {
                    initialRequest: function(System) { return System.config() }
                }
            }
        }
    })

    .state('system.wechat', {
        url: '/wechat',
        views: {
            'main@admin': {
                templateUrl: 'admin/system/wechat.html',
                controller: 'SystemWechatController as vm',
                resolve: {
                    initialRequest: function(System) { return System.wechat() }
                }
            }
        }
    })

    .state('system.applist', {
        url: '/applist?{name:string}&{desc:string}&{filesize:int}&{type:string}&{version:string}&{page:int}&{size:int}',
        params: {
            name: null,
            desc: null,
            filesize: null,
            type: null,
            version: null,
            page: { value: 1, squash: true },
            size: { value: 10, squash: true }
        },
        views: {
            'main@admin': {
                templateUrl: 'admin/system/app-list.html',
                controller: 'SystemAppListController as vm',
                resolve: {
                    initialRequest: function(System, $stateParams) {
                        return System.appList({
                            clientName: $stateParams.name,
                            clientDesc: $stateParams.desc,
                            clientSize: $stateParams.filesize,
                            clientType: $stateParams.type,
                            clientVersion: $stateParams.version,
                            pageInfo: {
                                pageNumber: $stateParams.page,
                                pageSize: $stateParams.size
                            }
                        })
                    }
                }
            }
        }
    })

    .state('system.themes', {
        url: '/themes',
        views: {
            'main@admin': {
                templateUrl: 'admin/system/themes.html',
                controller: 'SystemThemesController as vm',
                resolve: {
                    theme: function(AdminInfo) {
                        return JSON.parse(AdminInfo.loginInfo.imageDiyBgVo)
                    }
                }
            }
        }
    })
})

.service('System', SystemModel)

.controller('SystemConfigController', SystemConfigController)
.controller('SystemWechatController', SystemWechatController)
.controller('SystemAppListController', SystemAppListController)
.controller('SystemThemesController', SystemThemesController)
