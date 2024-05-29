<template>
    <el-rate v-model="form[attr.prop]" v-bind="mergeAttr"/>
</template>

<script lang="ts" setup>
import { computed } from "vue";
defineOptions({
    name: 'MyRate',
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