function StatsVPHsController(
    Stats,
    $state,
    $stateParams
) {
    var vm = this

    vm.queryParams = _.clone($stateParams)

    load()

    vm.search = function() { $state.go($state.current, vm.queryParams) }

    function load() {
        Stats.vphs({
            visitDate: $stateParams.date,
            pageInfo: {
                pageNumber: $stateParams.page,
                pageSize: $stateParams.size
            }
        }).$promise.then(function (result) {
            vm.vphs = result.content.reverse()
            vm.series = [{
                name: '在线人数',
                data: _.pluck(vm.vphs, 'sessionNum'),
                color: '#7cb5ec'
            }, {
                name: '访问量',
                data: _.pluck(vm.vphs, 'visitsNum'),
                color: '#f15c80'
            }, {
                name: '注册人数',
                data: _.pluck(vm.vphs, 'registerNum'),
                color: '#98a7ae'
            }]

            vm.options = {
                xAxis: {
                    categories: _.pluck(vm.vphs, 'createDate').map(function(data) {
                        return moment(data).format('HH') + '点'
                    })
                },
                yAxis: {
                    labels: {
                        formatter: function() {
                            return (this.value / 1000) + '千人'
                        }
                    }
                }
            }
        },function (error) {
            alert(error.message);
        })
    }
}
