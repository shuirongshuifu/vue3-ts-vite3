<template>
    <el-alert v-bind="props.attr" />
</template>

<script lang="ts" setup>
defineOptions({
    name: 'MyAlert',
})
const props = defineProps({
    attr: {
        type: Object,
        required: true,
    },
});
</script>