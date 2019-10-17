(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor: Lyric,
        init: function (path) {
            this.path = path;
        },
        times: [],
        lyrics: [],
        index: -1,
        loadLyric: function (callBack) {
            var $this = this;
            //清空上一首歌词和时间
            $this.times=[];
            $this.lyrics=[];
            $.ajax({
                url: $this.path,
                dataType: "text",
                success: function (data) {
                    $this.parseLyric(data);
                    callBack();
                },
                error: function (e) {
                    console.log(e)
                }
            });
        },
        parseLyric: function (data) {
            var $this = this;
            var array = data.split("\n");
            var timeReg = /\[(\d*:\d*\.\d*)\]/
            //遍历取出每一条歌词
            $.each(array, function (index, ele) {
                //处理歌词
                var lrc = ele.split("]")[1];
                if (lrc.length == 1) return true;
                $this.lyrics.push(lrc);

                var res = timeReg.exec(ele);
                if (res == null) return true;
                var timerStr = res[1];
                var res2 = timerStr.split(":");
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(min + sec).toFixed(2));
                $this.times.push(time);

            })
            console.log($this.times);
            console.log($this.lyrics);
        },
        currentIndex: function (currentTime) {
            // console.log(currentTime);
            //每次进来判断的都是最新一条歌词的时间，因为上一条歌词的时间已经被删除了
            if (currentTime >= this.times[0]) {
                this.index++;
                this.times.shift();//删除数组最前面的一个元素
            }
            return this.index;
        }
    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);