angular.module('vn.rich-editor', [])

.directive('vnRichEditor', vnRichEditorComponent)
.controller('vnRichEditorController', vnRichEditorController)

function vnRichEditorComponent($sce) {
    return {
        restrict: 'A',
        require: ['vnRichEditor', 'ngModel'],
        scope: {
            model: '=ngModel',
            options: '=?vnRichEditor'
        },
        controller: 'vnRichEditorController as editor',
        bindToController: true,
        compile: vnRichEditorCompile,
    }

    function vnRichEditorCompile(element, attrs) {
        // 如果有 uploadFiles 和 uploadHandler 存在，插入上传组件
        if (attrs.uploadFiles && attrs.uploadHandler) {
            var id = attrs.id + 'Uploader'
            var uploadElement = angular.element(
                '<div id="' + id + '" ng-model="' + attrs.uploadFiles
                + '" ngf-select accept="image/*" ngf=accept="\'image/*\'"'
                + '" ngf-change="' + attrs.uploadHandler + '"></div>'
            )
            element.after(uploadElement)
        }

        return vnRichEditorLink
    }

    function vnRichEditorLink($scope, $element, $attrs, controllers) {
        // 判断 CKEDITOR 是否存在，若非则报错
        try {
            if (typeof CKEDITOR.version !== 'string')
                throw new Error('CKEDITOR 未找到，请确认是否已加载')
        } catch(e) { return console.error(e) }

        var editor  = controllers[0]
        var ngModel = controllers[1]

        // 初始化编辑器
        editor.render($element[0])

        // 如果属性有 upload，开启自定义上传按钮和触发选择文件的命令
        if (editor.uploadEnabled) {
            editor.instance.ui.addButton('Upload', {
                label: '上传',
                command: 'vn.upload',
                toolbar: 'insert, 1',
                icon: '../images/icon-upload0.png'
            })

            editor.instance.addCommand('vn.upload', {
                exec: function(editor) {
                    document.getElementById($attrs.id + 'Uploader').click()
                }
            })
        }

        // 捕获 change 事件并更新 ngModel
        editor.instance.on('change', function() {
            ngModel.$setViewValue(this.getData().trim() || '')
        })

        // 捕获 vnRichEditor.insertImages 事件并插入图片
        $scope.$on('vnRichEditor.insertImages', function(event, pathList) {
            editor.instance.insertHtml(pathList.map(function(path) {
                return '<a href="' + path + '" target="_blank">' +
                    '<img src="' + path + '" style="width: 400px"></a>'
            }).join())
        })

        // 指令销毁的时候也把编辑器销毁
        $scope.$on('$destroy', function() {
            editor.instance && editor.instance.destroy(false)
        })
    }
}

function vnRichEditorController($scope, $element, $attrs) {
    // 渲染编辑器
    this.render = function(element) {
        this.instance = CKEDITOR.replace(element, this.options)
    }

    // 判断是否允许上传
    this.uploadEnabled = (function() {
        if ($attrs.uploadFiles && $attrs.uploadHandler)
            return true
        return false
    }())
}
