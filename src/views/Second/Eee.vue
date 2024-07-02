<template>
    <div class="myCalendarWrap">
        <Calendar :select-date="selectModeDate" monFirst backgroundText class-name="myCalendar"
            :format="formatOfRangeMode" :lunar="lunar" :weeks="weeks" @onSelect="onSelect" :tileContent="tileContent" />

    </div>
</template>

<script setup lang="ts">
import Calendar from '@/components/MyCalendar/mpvue-calendar.vue'
import lunar from '@/components/MyCalendar/lunar'

import { ref } from 'vue';

const tileContent = ref({
    '2024-6-23': { className: 'prev' },
    '2024-6-25': { className: 'cur' },
    '2024-6-27': { className: 'next' },
})

const weeks = ['一', '二', '三', '四', '五', '六', '日']

const onSelect = (selectDate: string) => {
    console.log(selectDate, 'selectDate')
}

const selectModeDate = '2024-6-25'

const formatOfRangeMode = (year: string, month: string) => {
    const transform: { [key: string]: string } = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九',
        10: '十',
        11: '十一',
        12: '十二',
    }
    return [`${year}年`, `${transform[month]}月`];
}
</script>

<style lang="less">
.myCalendarWrap {
    display: flex;
    flex-wrap: wrap;

    .myCalendar {
        &.mpvue-calendar {
            width: 400px;
            flex: none;
        }
    }
}
</style>