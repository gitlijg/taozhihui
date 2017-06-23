function FootballModel(API, $resource) {
    this.actions = {};

    //国际联赛赛程
    this.actions.fixture = {
        url: API + '/console/2.0/football/fixture/:leagueType/:publishStatus',
        isArray:true
    };

    //中超赛程
    this.actions.zhongchao = {
        url: API + '/console/2.0/football/zhongchao/:publishStatus',
        isArray:true
    };

    //发布国际联赛
    this.actions.publish = {
        url: API + '/console/2.0/football/publish',
        method:'POST'
    };
    //发布欧洲杯比赛结果
    this.actions.publishOZB = {
        url: API + '/console/2.0/football/ouzhoubei',
        method:'POST'
    };

    //发布中超
    this.actions.publishZhongchao = {
        url: API + '/console/2.0/football/publishZhongchao',
        method:'POST'
    };

    return $resource.call(this, this.url, this.params, this.actions)

}
