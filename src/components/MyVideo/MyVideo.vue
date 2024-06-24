<template>
    <div id="xgPlayerWrap"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, reactive, computed, onUnmounted } from 'vue';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { conf } from "./conf";
import { useCtrlDrag } from "@/hook/ctrlDrag";
import { cloneDeep } from "lodash";

const { onMonitor, offMonitor } = useCtrlDrag()

defineOptions({ name: 'MyVideo' })

const props = defineProps({
    // 视频配置
    videoInfo: {
        type: Object,
        default: () => {
            return {
                url: '',
                poster: '',
                lastPlayTime: 0
            }
        }
    }
});

let player: any = null // 实例

watch(() => props.videoInfo.url, () => {
    player && player.destroy()
    init()
})

const emit = defineEmits(['play', 'pause', 'savePlayInfo']);

onMounted(() => {
    init()
})

onUnmounted(() => { 
    player && player.destroy()
    timer && clearInterval(timer)
})

// 保存信息
const timeInfo = {
    startSecond: 0, // 视频开始播放秒数
    startTimestamp: 0, // 开始播放对应的时间戳
    endSecond: 0, // 视频停止播放秒数
    endTimestamp: 0, // 停止播放对应的时间戳
}

// 定时发请求
let timer: any = null
let gap = 5000

const init = () => {
    player = new Player({
        ...conf,
        ...props.videoInfo,
    });
    onMonitor()
    player.on('play', (v: any) => {
        timeInfo.startSecond = getCurrentVideoPlayTime()
        timeInfo.startTimestamp = new Date().getTime()
        timer = setInterval(() => { savePlayInfo() }, gap)
    })
    player.on('pause', (v: any) => {
        savePlayInfo()
        timer && clearInterval(timer)
    })
    player.on('seeked', (v: any) => {
        // 播放时跳转重置时间，清空定时器，新建定时器（暂停情况不用处理）
        timer && clearInterval(timer)
        if (!player.paused) {
            timeInfo.startSecond = getCurrentVideoPlayTime()
            timeInfo.startTimestamp = new Date().getTime()
            timer = setInterval(() => { savePlayInfo() }, gap)
        }
        console.log('seeked', getCurrentVideoPlayTime());
    })
    player.on('loadedmetadata', (v: any) => {
        if (props.videoInfo.lastPlayTime) {
            player.seek(props.videoInfo.lastPlayTime)
        }
    })
}

const savePlayInfo = () => {
    const timestamp = new Date().getTime()
    timeInfo.endSecond = isEnd() ? getVideoDurationTime() : getCurrentVideoPlayTime()
    timeInfo.endTimestamp = timestamp
    const info = cloneDeep(timeInfo)
    // @ts-ignore
    info.speed = getRate()
    console.log('保存播放信息', info);
    emit('savePlayInfo', info)
    timeInfo.startSecond = timeInfo.endSecond
    timeInfo.startTimestamp = timestamp
}

// 是否播放完毕
const isEnd = () => player.currentTime == player.duration

// 获取当前视频播放的时间位置，如当前视频播放到第12秒
const getCurrentVideoPlayTime = () => Math.floor(player.currentTime)

// 获取当前视频的总时长，如一个视频两分钟即120秒
const getVideoDurationTime = () => Math.floor(player.duration)

// 获取当前视频的播放速度
const getRate = () => player.playbackRate
</script>

<style scoped>
#xgPlayerWrap {
    flex: auto;
}
</style>
