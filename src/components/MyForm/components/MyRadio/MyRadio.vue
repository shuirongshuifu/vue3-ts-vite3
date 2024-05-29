<template>
    <el-radio-group v-model="form[attr.prop]" v-bind="radioGroupAttr">
        <template v-if="attr.attr.type == 'radio'">
            <el-radio v-for="(item, index) in attr.attr.options" :value="item.value" :label="item.label"></el-radio>
        </template>
        <template v-if="attr.attr.type == 'button'">
            <el-radio-button v-for="(item, index) in attr.attr.options" :value="item.value"
                :label="item.label"></el-radio-button>
        </template>
    </el-radio-group>
</template>

<script lang="ts" setup>
import { computed } from "vue";
defineOptions({
    name: 'MyRadio',
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
const radioGroupAttr = computed(() => {
    const defaultAttr = {
        size: 'default'
    }
    return { ...defaultAttr, ...props.attr }
})
</script>