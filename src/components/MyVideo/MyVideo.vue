<template>
    <div id="xgPlayerWrap"></div>
    <button @click="notnot">禁用</button>
    <button @click="cancan">可用</button>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, reactive, computed, onUnmounted } from 'vue';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { conf } from "./conf";
import { useCtrlDrag } from "@/hook/ctrlDrag";

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
                lastPlayTime: ''
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

let status = '看完了'
// let status = '没看完'

onMounted(() => {
    init()
    setTimeout(() => {
        if (status == '没看完') {
            onMonitor()
        } else {
            offMonitor()
        }
    }, 500);
})
onUnmounted(() => { player && player.destroy() })

// 拖动（向前、向后）情况最后考虑
const timeInfo = {
    startSecond: 0, // 视频开始播放秒数
    startTimestamp: 0, // 开始播放对应的时间戳
    endSecond: 0, // 视频停止播放秒数
    endTimestamp: 0 // 停止播放对应的时间戳
}

let tim = 0
let lastTime = 0;

const init = () => {
    player = new Player({
        ...conf,
        ...props.videoInfo,
    });
    player.on('play', (v: any) => {
        timeInfo.startSecond = getCurrentVideoPlayTime()
        timeInfo.startTimestamp = new Date().getTime()
        // emit('play', timeInfo)
    })
    player.on('pause', (v: any) => {
        timeInfo.endSecond = isEnd() ? getVideoDurationTime() : getCurrentVideoPlayTime()
        timeInfo.endTimestamp = new Date().getTime()
        // emit('pause', timeInfo)
        // savePlayInfo()
        // if (isEnd()) {
        //     console.log('播放完毕的暂停');
        // } else {
        //     console.log('中间暂停');
        // }
    })
    // player.on('seeking', (v:any)=>{
    //     if(v.currentTime > tim){

    //     }
    //     if(v.currentTime < tim){

    //     }
    //     // video.currentTime = video.seekable.start(0)
    // })

    player.on('timeupdate', (v: any) => {
        // if (player.currentTime > lastTime) {
        //     console.log('向右');
        // } else if (player.currentTime < lastTime) {
        //     console.log('向左');
        // }
        // lastTime = player.currentTime;
    })
    // player.on('loadedmetadata', (v: any) => {
    //     console.log('-媒体数据加载好了-', v);
    // })




}


const savePlayInfo = () => {
    emit('savePlayInfo', timeInfo)
    console.log('保存播放信息', timeInfo);
    // 开始暂停替换
}

// 是否播放完毕
const isEnd = () => player.currentTime == player.duration

// 获取当前视频播放的时间位置，如当前视频播放到第12秒
const getCurrentVideoPlayTime = () => Math.floor(player.currentTime)

// 获取当前视频的总时长，如一个视频两分钟即120秒
const getVideoDurationTime = () => Math.floor(player.duration)

</script>

<style scoped>
#xgPlayerWrap {
    flex: auto;
}
</style>
