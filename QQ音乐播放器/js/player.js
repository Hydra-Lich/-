(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],
        init: function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1,
        playMusic: function (index, music) {
            //判断是否是同一首音乐
            if (this.currentIndex == index) {
                //同一首音乐
                if (this.audio.paused) {
                    this.audio.play();//原生的播放音频
                } else {
                    this.audio.pause();//原生的暂停音频
                }
            } else {
                //不是同一首歌
                this.$audio.attr("src", music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        preIndex: function () {
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            return index;
        },
        nextIndex: function () {
            var index = this.currentIndex + 1;
            if (index > this.musicList.length - 1) {
                index = 0;
            }
            return index;
        },
        changeMusic: function (index) {
            //删除对应的数据
            this.musicList.splice(index, 1);
            //判断当前删除的歌曲是否是当前播放歌曲的前面
            if (index < this.currentIndex) {
                this.currentIndex = this.currentIndex - 1;
            }
        },
        getMusicDuration: function () {
            //音乐总时长
            return this.audio.duration;
        },
        getMusicCurrentTime: function () {
            //音乐当前播放的时间
            return this.audio.currentTime;
        },
        musicTimerUpdate: function (callBack) {
            var $this = this;
            this.$audio.on("timeupdate", function () {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timeStr = $this.formatDate(currentTime, duration);
                // return只能返回一个值
                callBack(currentTime,duration,timeStr);
            });
        },
        formatDate: function (currentTime, duration) {
            var endMin = parseInt(duration / 60);
            var endSec = parseInt(duration % 60);
            if (endMin < 10) {
                endMin = "0" + endMin;
            }
            if (endSec < 10) {
                endSec = "0" + endSec;
            }

            var startMin = parseInt(currentTime / 60);
            var startSec = parseInt(currentTime % 60);
            if (startMin < 10) {
                startMin = "0" + startMin;
            }
            if (startSec < 10) {
                startSec = "0" + startSec;
            }
            return startMin + ":" + startSec + " / " + endMin + ":" + endSec;
        }

    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);