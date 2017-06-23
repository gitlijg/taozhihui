angular.module('admin', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'angular-storage',
    'ngFileUpload',
    'ui.keypress',
    'ui.router',
    'angular.patch',
    // 'ct.ui.router.extras.dsr',
    // 'ct.ui.router.extras.sticky',
    // 'ct.ui.router.extras.transition',
    // 'angular-growl',
    'mgcrea.ngStrap',
    'ui.bootstrap.tpls',
    'ui.bootstrap.pagination',
    'ui.bootstrap.progressbar',
    'ui.select',
    'angulartics',
    'angulartics.piwik',

    'vn.elements',
    'vn.chart',
    'vn.rich-editor',

    'templates',
    'session',
    'dashboard',

    'streams',
    'blogs',
    'questions',
    'tags',
    'broadcast',
    'notices',
    'sms',
    'lottery',
    'redpack',
    'meetingRoom',
    'chexiang',
    'image',
    'users',
    'teams',
    'points',
    'document',
    'stats',
    'smssend',
    'system',
    'proposal',
    'meeting',
    'platform',
    'sina',
    'sessions',
    'platform',
    'groupUserVisits',
    'customspace',
    'grouplog',
    'football',
    'appStat',
    'share',
    'top',
    'reports'
])

.config(function CoreRoute($stateProvider) {
    $stateProvider.state('admin', {
        abstract: true,
        params: { user: null },
        templateUrl: 'admin/admin-layout.html',
        controller: 'AdminController as admin',
        resolve: {
            validAdmin: function(store) {
                return store.get('currentAdmin')
            },
            AdminInfo: function($q, store, Role, User, $http, API) {

                if (_.isNull(store.get('currentAdmin'))) { return }

                return $q.all({
                    loginInfo: store.get('loginInfo'),
                    permissions: Role.permissions().$promise,
                    currentAdmin: new User(store.get('currentAdmin')),
                    dictionaries: $http.get(API + '/query/dicts')
                })

                .then(function(response) {
                    return {
                        loginInfo: response.loginInfo,
                        permissions: response.permissions,
                        currentAdmin: response.currentAdmin,
                        dictionaries: response.dictionaries.data
                    }
                })
            }
        },
        onEnter: function(validAdmin, $state) {
            if (validAdmin) { return }
            $state.go('session.signin')
        }
    })
})

// 禁用开发时的调试信息输出（TODO: 应放入构建流程自动化处理）
.config(function DevelopmentDebugging($compileProvider) {
    $compileProvider.debugInfoEnabled(true);
})

// API 返回代码拦截器
.config(ApiCodeInterceptorConfiguration)

// ngStrap 配置
.config(ngStrapConfiguration)

// ui.bootstrap 配置
.config(uiBootstrapConfiguration)

// ui.select 配置
.config(uiSelectConfiguration)

// 自定义的 Aside Panel 服务
.provider('AsidePanel', AsidePanel)
.config(function AsidePanelConfig($asideProvider, AsidePanelProvider) {
    AsidePanelProvider.defaults = angular.extend(
        $asideProvider.defaults, AsidePanelProvider.defaults
    )
})

// 自定义的 Confirm Modal 服务
.provider('ConfirmModal', ConfirmModal)
.config(function ConfirmModalConfig($modalProvider, ConfirmModalProvider) {
    ConfirmModalProvider.defaults = angular.extend(
        $modalProvider.defaults, ConfirmModalProvider.defaults
    )
})

// 用来处理 createDate 和 updateDate 的过滤器
.filter('readable', ReadableFilter)

// 用来获取文件的原始版本
.filter('replace', ReplaceFilter)

// 用来排序的服务
.factory('Sorter', SorterService)

// 用来检查用户角色的服务
.service('RoleChecker', RoleCheckerService)

// 增强angular对input[checkbox]对支持
.directive(patchCheckboxDirective)

.constant('Meta', {
    applicationName:
        document.querySelector('meta[name=application-name]').getAttribute('content'),
    creator:
        document.querySelector('meta[name=creator]').getAttribute('content'),
    publisher:
        document.querySelector('meta[name=publisher]').getAttribute('content')
})

.constant('API',
          document.querySelector('meta[name=api]').getAttribute('content'))

.controller('AdminController', AdminController)
