function ReadableFilter() {
    return function ReadableFilterFunction(input, type) {
        if (_.isNull(input) || (_.isString(input) && input === ''))
            return '-'

        if (type === 'datetime')
            return moment(input).format('YYYY-MM-DD HH:MM:SS')

        if (type === 'date')
            return moment(input).format('YYYY-MM-DD')

        if (_.isNumber(input) && type === 'phone') {
            var input = '' + input
            return [input.slice(0, 3), input.slice(3, 7), input.slice(7, 11)].join(' ')
        }

        var orgFlags = {
            'P': '个人',
            'O': '公司'
        }
        if (type === 'flag') return orgFlags[input]

        var roleTypes = {
            'A': '超级管理员',
            'B': '公司管理员',
            'C': '普通用户'
        }
        if (type === 'role') return roleTypes[input]


        var integralSource = {
            'U': '用户积分',
            'M': '版主额度积分',
            'A': '后台手动积分'
        }
        if (type === 'source') return integralSource[input]

        var annexations = {
            'A': '附件',
            'B': '约会',
            'C': '投票',
            'D': '图片',
            'E': '抽奖',
            'T': '标签'
        }
        if (type === 'annexation') {
            var result = input.split('').map(function(value) {
                return annexations[value]
            })

            if (result.length > 1) { return result.join(' ') }
            return result.join('')
        }

        var origins = [ 'Web', 'iOS', 'Android', 'RSS', 'E-mail', '微博', '微信' ]
        if (type === 'origin') return origins[input]

        var systemConfig = {
            "smsswitch":        "短信",
            "sysmonitorswitch": "监控",
            "pushswitch":       "推送",
            "chatswitch":       "聊天",
            "mailswitch":       "邮件"
        }
        if (type === 'systemConfig') return systemConfig[input]

        if (type === 'smsMark') {
            return input.replace(/(S)|(F)/, function(match) {
                if (match === 'S') { return '成功' }
                if (match === 'F') { return '失败' }
            })
        }

        var crud = {
            'C': '创建',
            'R': '读取',
            'U': '更新',
            'D': '删除'
        }
        if (type === 'crud') return crud[input]

        if (type === 'ms') return input + ' 毫秒'

        if (type === 'booking') {
            var startTime = _timingTransform('' + input)
            var endInput = input + 30
            var endTime   = _timingTransform('' + ((endInput)%100 == 60 ? endInput + 40 : endInput))

            return startTime + '~' + endTime
        }

        function _timingTransform(input) {
            var pos = input.length == 3 ? 1 : 2
            return [input.slice(0, pos), ':', input.slice(pos)].join('')
        }

        return input
    }
}
