function FootballController(Football,$stateParams,$scope,$state,FootballList,AsidePanel) {
    var vm = this;

    vm.queryParams = $stateParams;

    //国际联赛类型
    vm.type = 'A';

    /**********************************************************/

    FootballList.$promise.then(function(response) {
        vm.list = _.map(response,
            function(stream) { return new Football(stream) })

        vm.queryParams = _.clone($stateParams)
    })

    //切换到国际赛程
    vm.fixture = function(){
        $state.reload($state.current)
    };

    //切换到中超赛程
    vm.zhongchao = function(){
        vm.type = 'B';

        Football.zhongchao({publishStatus:$stateParams.publishStatus})
            .$promise.then(function(response) {
                vm.list = response
            })
            .catch(console.error.bind(console))
    };

    vm.search = function() { $state.go($state.current, vm.queryParams) };

    vm.load = function(num){
        vm.queryParams.leagueType = num;
        vm.search();
    };

    //发布竞猜
    vm.action = function(options) {

        var initialParams = _.pick(options.data, [
            'id','title'
        ])

        vm.football = new Football(initialParams);

        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/football/form.html'
        })
            .then(function(result) {
                result.aside.hide();
                if(result.data.type == 'B'){
                    vm.queryParams.leagueType = 6
                }
                return Football.publish({
                    fixtureId:vm.football.id,
                    leagueType:vm.queryParams.leagueType,
                    win:vm.football.win.toFixed(2),
                    lose:vm.football.lose.toFixed(2),
                    draw:vm.football.draw.toFixed(2)
                })
            })
            .then(function(response) { $state.reload($state.current) })
            .catch(console.error.bind(console))
    }
    //发布欧洲杯比赛结果
    vm.pushJc = function(options) {
        var initialParams = _.pick(options.data, [
            'id','title'
        ]);

        vm.footballOZB = new Football(initialParams);
        AsidePanel.open($scope, {
            title: options.text,
            contentTemplate: 'admin/football/formOZB.html'
        })
            .then(function(result) {

                return Football.publishOZB({
                    id:vm.footballOZB.id,
                    score1:vm.footballOZB.score1,
                    score2:vm.footballOZB.score2
                },function(res) {
                    alert('发布成功');
                    result.aside.hide();
                    $state.reload($state.current);
                },function(respone) {
                    alert(respone.message);
                })
            })
            .catch(console.error.bind(console))
    };

    $scope.$watchCollection('vm.list', function(newValue, oldValue) {
        vm.isEmpty = (!_.isEqual(newValue, oldValue)) && _.isEmpty(newValue)
    })
}
