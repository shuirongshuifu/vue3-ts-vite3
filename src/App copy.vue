<template>
  <div ref="videoContainer" class="video-item" />
</template>

<script>
import DPlayer from 'dplayer'

export default {
  name: 'VideoPlayer',
  // eslint-disable-next-line vue/require-prop-types
  props: ['source', 'cover', 'subtitle', 'lastPlayTime', 'highlight'],
  // source: mp4播放地址 cover视频封面 subtitle: 字幕地址 lastPlayTime: 上次观看的停止时间
  // highlight:提示点信息 时间单位:秒 可用来显示题目相关信息 highlight:[{time: 120, text: '开始答题', needPause: true}]
  // 设置needPause为true时，当播放到指定时间，会emit pauseAtHighlight至父组件
  // 目前组件对方外触发的事件有：pauseAtHighlight、play、pause、playTimeUpdate

  data () {
    return {
      dbPlayer: null,
      highlightPause: [],
      timeInfo: {
        startSecond: 0, // 视频播放开始的秒数
        endSecond: 0, // 视频播放截止的秒数
        startTimestamp: 0, // 视频播发开始的时间戳
        endTimestamp: 0 // 视频播放截止的时间戳
      },
      continuePlay: 0 // 连续播放时间，30s触发一次记录
    }
  },
  computed: {
    videoDuration(){
      return Math.floor(this.dbPlayer.video.duration)
    }
  },
  watch: {
    source: function () {
      if (this.dbPlayer) {
        this.dbPlayer.destroy()
        this.initPlayer()
      } else {
        this.initPlayer()
      }
    },
    highlight: function () {
      this.initHighLight()
    }
  },
  beforeDestroy () {
    this.dbPlayer && this.dbPlayer.destroy()
  },
  mounted () {
    this.initPlayer()
  },
  methods: {
    initPlayer () {
      if (this.source) {
        const playerConfig = {
          container: this.$refs.videoContainer,
          lang: this.$i18n.locale === 'zh' ? 'zh-cn' : 'en',
          contextmenu: []
        }
        this.source && (playerConfig.video = { url: this.source })
        this.cover && (playerConfig.video = Object.assign({ pic: this.cover }, playerConfig.video || {}))
        this.subtitle && (playerConfig.subtitle = { url: this.subtitle })

        this.dbPlayer = new DPlayer(playerConfig)
        this.dbPlayer.on('play', () => {
          this.timeInfo.startSecond = this.currentTime()
          this.timeInfo.startTimestamp = new Date().getTime()
          this.continuePlay = 0
          this.$emit('play', currentTime)
        })
        this.dbPlayer.on('pause', () => {
          const currentTime = this.currentTime()
          this.$emit('pause', currentTime)
          // 新增 区分视频未播放完暂停[notFinishPause]和播放完暂停[finishPause]，默认是未播放完暂停
          this.isFinish() ? this.savePlayInfo('finishPause') : this.savePlayInfo() // notFinishPause
        })
        this.dbPlayer.on('loadedmetadata', () => {
          // 标记暂停点
          this.highlight && this.initHighLight()
          // 跳至上次播放位置
          if (this.lastPlayTime && this.lastPlayTime < this.dbPlayer.video.duration) {
            this.jumpToTime(this.lastPlayTime)
          }
          this.initPlayEvent()
        })
      }
    },
    initHighLight () {
      const highlightArr = this.highlight
      this.highlightPause = (this.highlight || []).filter(item => item.needPause && item.time).sort((pre, next) => pre.time - next.time)
      if (this.dbPlayer) {
        this.dbPlayer.options.highlight = highlightArr
        if (highlightArr) {
          const highlights = this.$refs.videoContainer.querySelectorAll('.dplayer-highlight');
          [].slice.call(highlights, 0).forEach((item) => {
            this.dbPlayer.template.playedBarWrap.removeChild(item)
          })
          for (let i = 0; i < highlightArr.length; i++) {
            if (!highlightArr[i].text || !highlightArr[i].time) {
              continue
            }
            const p = document.createElement('div')
            p.classList.add('dplayer-highlight')
            p.style.left = (highlightArr[i].time / this.dbPlayer.video.duration) * 100 + '%'
            p.innerHTML = '<span class="dplayer-highlight-text">' + highlightArr[i].text + '</span>'
            this.dbPlayer.template.playedBarWrap.insertBefore(p, this.dbPlayer.template.playedBarTime)
          }
        }
      }
    },
    initPlayEvent () {
      let countSeconds = this.timeInfo.startSecond || 0
      this.dbPlayer.on('timeupdate', () => {
        const currentTime = this.currentTime()
        if (currentTime < countSeconds) {
          // 视频向前拖动
          countSeconds = currentTime
          this.continuePlay = 0
          !this.dbPlayer.video.paused && this.savePlayInfo()
          return false
        }
        if (currentTime - countSeconds < 1) {
          // 时间变化一秒以内
          return false
        } else {
          // 一秒钟触发一次对应的事件
          this.continuePlay += 1
        }
        let emitpause = false
        const highlights = this.highlightPause
        if (highlights.length > 0) {
          for (const highlight of highlights) {
            if (countSeconds < highlight.time && currentTime >= highlight.time) {
              // 在定点时间暂停视频，并触发对应的事件；
              this.$emit('pauseAtHighlight', highlight)
              emitpause = true
              countSeconds = highlight.time
              this.continuePlay = 0
              this.jumpToTime(highlight.time)
              this.dbPlayer.pause()
              break
            }
          }
        }
        if (!emitpause) {
          if (currentTime - countSeconds >= 2) {
            // 视频向后拖动
            !this.dbPlayer.video.paused && this.savePlayInfo()
            this.continuePlay = 0
            countSeconds = currentTime
          } else {
            countSeconds = currentTime
            this.timeInfo.endSecond = countSeconds
          }
        }
        if (this.continuePlay >= 30 && !this.dbPlayer.video.paused) {
          this.continuePlay = 0
          this.savePlayInfo()
        }
      })
    },
    jumpToTime (time) {
      this.dbPlayer.seek(time)
    },
    currentTime () {
      return this.dbPlayer ? Math.floor(this.dbPlayer.video.currentTime) : 0
    },
    savePlayInfo (status) {
      const timestamp = new Date().getTime()
      const info = {
        startTimestamp: this.timeInfo.startTimestamp,
        endTimestamp: timestamp,
        startSecond: this.timeInfo.startSecond,
        // 当status存在就说明是播放完暂停的，endSecond传递视频总时长即可
        endSecond: status ? this.videoDuration : this.timeInfo.endSecond
      }
      this.$emit('playTimeUpdate', info)
      console.log('info',info.startSecond,info.endSecond);
      this.timeInfo.startTimestamp = timestamp
      this.timeInfo.startSecond = this.currentTime()
      this.timeInfo.endSecond = 0
      this.continuePlay = 0
    },
    isFinish(){
      // 若当前播放时间 正好等于 视频总时长 说明播放完了【解决30秒倍数视频传参endSecond为0的问题】
      return this.dbPlayer.video.currentTime == this.dbPlayer.video.duration
    }
  }
}
</script>

<style scoped>
.video-item {
  width: 100%;
  height: 100%;
}
</style>
