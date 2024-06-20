<template>
    <div>
        <div class="kkk">
            <MyVideo :videoInfo="videoInfo" />
        </div>
        <button @click="chan">切换</button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MyVideo from "@/components/MyVideo/MyVideo.vue";

const videoInfo = reactive({
    url: 'http://ashuai.work/api/mp4.mp4',
    poster: 'http://ashuai.work/static/img/avantar.png',
})

const chan = () => {
    videoInfo.url = new Date().getTime() + '-'
}
</script>

<style>
.kkk {
    width: 600px;
}
</style>