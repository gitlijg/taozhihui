(function(window, Zepto) {
    var degrees = ['-127deg', '-67deg', '-7deg', '53deg', '113deg', '173deg'];
    var ANIMATION_DURATION = 3000;  // 模拟动画运行时间，单位毫秒
    var lottery = parseQueryParams(window.location.search);
    var apiDomain = '/sloth_seed';
    var apiPath = apiDomain + '/mobile/' + lottery.type + '/' + lottery.id;

    // 解析 URL 携带的查询参数，返回对象，每一对 k/v 代表一对查询参数
    function parseQueryParams(params) {
        var i , paramsHash = {} , paramsList = params.substring(1).split('&');

        for (i = 0; i < paramsList.length; i++) {
            var paramPair = paramsList[i].split('=');
            paramsHash[paramPair[0]] = paramPair[1];
        }

        return paramsHash;
    }

    function processFailure(response) {
        alert(response.msg);

        if (1 === window.parseInt(lottery.mobile, 10))
            window.location.replace('http://i.am.mobile')
        else window.close()
    }

    Zepto(function($) {
        var $retry       = $('.retry');
        var $close       = $('.close');
        var $watch       = $('.lottery-watch');
        var $needle      = $('.lottery-needle');
        var $result      = $('.lottery-result');
        var $placeholder = $('.lottery-picture');
        var $description = $('.lottery-description');

        if (lottery.bg)
            $watch.css('background-image', 'url(' + apiDomain + lottery.bg + ')');
        else
            $watch.css('background-image', 'url(assets/images/bg-lottery-blank.png)');

        // 红包只能玩一次，抽奖可以重来
        if ('redpacket' === lottery.type) $retry.remove()
        else $retry.on('click', takeAShot)


        // 关闭按钮，如果是移动端，重定向地址
        $close.on('click', function() {
            if (1 === window.parseInt(lottery.mobile, 10))
                window.location.replace('http://i.am.mobile')
            else
                window.close()
        });

        function takeAShot() {
            $needle.addClass('slap');
            $result.removeClass('rise-up');
            $.get(apiPath, fireRequest);
        }

        function fireRequest(response) {
            // 有 id 的是抽奖
            if (response.id) {
                return window.setTimeout(function() {
                    // 若 id 为 -1，表示未抽中
                    if (window.parseInt(response.id, 10) === -1) {
                        $placeholder.remove();
                        $needle.css('transform', 'rotate(' + degrees[0] +');');
                        $needle.css(
                            '-webkit-transform', 'rotate(' + degrees[0] +');');
                        $description.text('很遗憾，您没有中奖！');
                    } else {
                        $needle.css('transform', 'rotate(' + degrees[response.orderId] +');');
                        $needle.css(
                            '-webkit-transform', 'rotate(' + degrees[response.orderId] +');');
                        $placeholder.attr(
                            'src', apiDomain + response.downloadImageUri);
                    }

                    $needle.removeClass('slap');
                    $result.addClass('rise-up');
                }, ANIMATION_DURATION);
            }

            // 有 code 且等于 10000 是红包
            var code = window.parseInt(response.code, 10);
            if (code && 10000 === code)
                return window.setTimeout(function() {
                    $needle.removeClass('slap');
                    $result.addClass('rise-up');
                }, ANIMATION_DURATION);
            else
                return window.setTimeout(function() {
                    $needle.removeClass('slap');
                    processFailure(JSON.parse(response));
                }, 1000);
        }

        takeAShot();
    });
}(this, Zepto));
