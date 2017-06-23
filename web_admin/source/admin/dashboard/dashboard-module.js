angular.module('dashboard', [])

.config(function DashboardRoute($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
        parent: 'admin',
        url: '/',
        views: {
            'main': {
                templateUrl: 'admin/dashboard/dashboard.html',
                controller: 'DashboardController as dashboard'
            }
        },
        resolve: {
            series: function($q, fakeSeries) { return $q.when(fakeSeries) }
        }
    })

    // 所有未辨识的路径都转向根路径
    $urlRouterProvider.when('/', '/stats/vphs');
    $urlRouterProvider.when('', '/stats/vphs');
    $urlRouterProvider.otherwise('/stats/vphs');
})

.value('fakeSeries', [{
    name: '今天',
    index: 2,
    legendIndex: 1,
    marker: { fillColor: '#fff', lineWidth: 2, lineColor: null },
    data: [208, 428, 1064, 1292, 1640, 1543, 1506, 1614, 2164, 1941, 1456, 844],
    pointStart: moment.utc().set({ 'h': 0, 'm': 0, 's': 0 }).valueOf(),
    pointInterval: 3600 * 2000  // 两小时
}, {
    type: 'area',
    name: '昨天',
    index: 1,
    legendIndex: 2,
    fillOpacity: 0.1,
    lineColor: '#98a7ae',
    lineWidth: 1,
    marker: { enabled: false, lineWidth: 1, lineColor: null },
    data: [352, 663, 948, 1558, 1524, 1698, 1406, 1397, 1990, 2078, 1281, 220],
    pointStart: moment.utc().set({ 'h': 0, 'm': 0, 's': 0 }).valueOf(),
    pointInterval: 3600 * 2000  // 两小时
}])

.controller('DashboardController', function DashboardController(fakeSeries) {
    var dashboard = this

    dashboard.series = fakeSeries

    dashboard.options = {
        chart: { height: '320' },
        tooltip: {
            formatter: function() {
                return '在线：' + this.y + '人'
            }
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 3600 * 1000,
            labels: {
                formatter: function() {
                    return moment.utc(this.value).hours() + '点'
                }
            }
        },
        yAxis: {
            labels: {
                formatter: function() {
                    return (this.value / 1000) + '千人'
                }
            }
        }
    }
})
