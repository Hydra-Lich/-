(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }
    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        inMove: false,
        progressClick: function (callBack) {
            var $this = this;//此时此刻的this是progress
            //监听背景的点击
            this.$progressBar.click(function (event) {
                // 这个方法里的this指$progressBar,需要拿到外面progress对象的数据,必须先保存外部的this
                // 获取背景距离窗口默认的位置
                var normalLeft = $(this).offset().left;
                // 获取点击的位置距离窗口的位置
                var eventLeft = event.pageX;
                // 设置前景的宽度
                $this.$progressLine.css("width", eventLeft - normalLeft);
                $this.$progressDot.css("left", eventLeft - normalLeft);
                //计算进度条的比例
                var value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            });
        },
        progressMove: function (callBack) {
            var $this = this;
            //获取背景距离窗口默认的位置
            var normalLeft = this.$progressBar.offset().left;
            var barWidth = this.$progressBar.width();
            var eventLeft;
            //1.监听鼠标的按下事件
            this.$progressBar.mousedown(function () {
                $this.isMove = true;
                // 获取背景距离窗口默认的位置
                var normalLeft = $(this).offset().left;
                //2.监听鼠标的移动事件
                $(document).mousemove(function () {
                    // 获取点击的位置距离窗口的位置,pageX获取鼠标的位置
                    var eventLeft = event.pageX;
                    var offset = eventLeft - normalLeft;
                    if (offset >= 0 && offset <= barWidth) {
                        // 设置前景的宽度
                        $this.$progressLine.css("width", eventLeft - normalLeft);
                        $this.$progressDot.css("left", eventLeft - normalLeft);
                    }
                });
            });
            //3.监听鼠标的抬起事件
            $(document).mouseup(function () {
                $(document).off("mousemove");
                $this.isMove = false;
                //计算进度条的比例
                var value = (eventLeft - normalLeft) / $this.$progressBar.width();
                callBack(value);
            });
        },
        setProgress: function (value) {
            if (this.isMove) return;
            if (value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value + "%"
            });
            this.$progressDot.css({
                left: value + "%"
            });
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);