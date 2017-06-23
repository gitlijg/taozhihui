angular.module('vn.chart', [])

.run(function setupHighcharts() {
    Highcharts.setOptions({
        global: {},
        lang: {
            contextButtonTitle: '图表菜单',
            downloadJPEG: '下载 JPG 图片',
            downloadPDF: '下载 PDF 文档',
            downloadPNG: '下载 PNG 图片',
            downloadSVG: '下载 SVG 图片',
            drillUpText: '返回至 {series.name}',
            printChart: '打印图表',
            resetZoom: '重置缩放',
            resetZoomTitle: '重置缩放比例 1:1',
            loading: '数据载入中……',
            noData: '暂无数据',
            months: [
                '一月' , '二月' , '三月' , '四月' , '五月' , '六月' ,
                '七月' , '八月' , '九月' , '十月' , '十一月' , '十二月'
            ],
            shortMonths: [
                '一月' , '二月' , '三月' , '四月' , '五月' , '六月' ,
                '七月' , '八月' , '九月' , '十月' , '十一月' , '十二月'
            ],
            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        }
    })
})

.value('chartDefaults', {
    chart: {
        spacingTop: 20,
        spacingBottom: 0
    },
    credits: {
        enabled: false,
        style: { color: '#98a6ad', fontSize: '12px' },
        position: { x: 0, y: -1 },
        href: 'http://www.visionet.com.cn/',
        text: '上海微企信息技术股份有限公司'
    },
    exporting: { enabled: true },
    title: { text: null },
    tooltip: { borderRadius: 2, borderWidth: 2, crosshairs: [false, { width: 1, color: '#aaadaf' }] },
    xAxis: {
        gridLineColor: '#edefef',
        gridLineWidth: 1,
        labels: { x: 10, y: 25, style: { color: '#aaadaf' } }
    },
    yAxis: {
        alternateGridColor: '#fcfefe',
        gridLineColor: '#edefef',
        labels: { y: 0, style: { color: '#aaadaf' } },
        title: { text: null }
    }
})

.directive('vnChart', function vnChartComponent() {
    return {
        restrict: 'E',
        scope: {
            series:  '=?',
            options: '=?',
            export:  '=?',
            credits: '=?'
        },
        link: vnChartLink,
        controller: 'vnChartController as chart',
        bindToController: true
    }

    function vnChartLink(scope, element, attrs, controller) {
        // 设定图表外包元素的样式
        element.css({ display: 'block', width: '100%', height: 'auto' })

        controller.renderChart(element[0])
    }
})

.controller('vnChartController', function vnChartController(chartDefaults) {
    var chart = this

    chart.renderChart = function(element) {
        // 合并默认选项与用户选项
        var options = _.merge({}, chartDefaults, chart.options || {})
        options.chart.renderTo = element
        options.series = chart.series || []

        if (angular.isDefined(chart.export))
            options.exporting.enabled = chart.export

        if (angular.isDefined(chart.credits))
            options.credits.enabled = chart.credits

        chart.instance = new Highcharts.Chart(options)
    }
})
