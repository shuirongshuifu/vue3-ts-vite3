<template>
    <el-date-picker v-model="form[attr.prop]" v-bind="mergeAttr" >
    </el-date-picker>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineOptions({
    name: 'MyDate',
})
const props = defineProps({
    form: {
        type: Object,
        required: true,
    },
    attr: {
        type: Object,
        required: true,
    },
});
const mergeAttr = computed(() => {
    const defaultAttr = {
        size: 'default'
    }
    return { ...defaultAttr, ...props.attr }
})
</script>