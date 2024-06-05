<template>
    <div id="xgPlayerWrap"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import Player, { Events } from 'xgplayer'; // 引入西瓜视频模块
import 'xgplayer/dist/index.min.css'; // 引入西瓜视频样式

import { conf } from "./conf";

defineOptions({ name: 'MyVideo' })

onMounted(() => { init() })

let player = null // 实例

// 拖动（向前、向后）情况最后考虑
const timeInfo = {
    startSecond: 0, // 视频开始播放秒数
    startTimestamp: 0, // 开始播放对应的时间戳
    endSecond: 0, // 视频停止播放秒数
    endTimestamp: 0 // 停止播放对应的时间戳
}

const init = () => {
    player = new Player({
        ...conf
    });
    player.on(Events.PLAY, (v: any) => {
        timeInfo.startSecond = getCurrentVideoPlayTime()
        timeInfo.startTimestamp = new Date().getTime()
        console.log('-播放开始记录-', timeInfo);
    })
    player.on(Events.PAUSE, (v: any) => {
        timeInfo.endSecond = getCurrentVideoPlayTime()
        timeInfo.endTimestamp = new Date().getTime()
        console.log('-停止发请求-', timeInfo);
        sessionStorage.setItem('saveLastTime', timeInfo.endSecond)
    })
    player.on(Events.TIME_UPDATE, (v: any) => {
        // console.log('-TIME_UPDATE-', v);
    })
    player.on(Events.SEEKED, (v: any) => {
        // console.log('-SEEKED-', v);
    })
    player.on('loadedmetadata', (v: any) => {
        console.log('-媒体数据加载好了-', v);
        let saveLastTime = sessionStorage.getItem('saveLastTime')
        if (saveLastTime) {
            console.log('saveLastTimesaveLastTime', saveLastTime);
            player.seek(Number(saveLastTime))
        }
    })
}

// 获取当前视频播放的时间位置，如当前视频播放到第12秒
const getCurrentVideoPlayTime = () => Math.floor(player.currentTime)




</script>

<style scoped>
#xgPlayerWrap {
    flex: auto;
}

#xgPlayerWrap video {
    width: 100%;
    color: chocolate;
}
</style>
