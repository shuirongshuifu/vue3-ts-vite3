<template>
    <div>
        <h1>组件</h1>
        <InputNumber v-model="vvv" />
    </div>
</template>

<script setup lang="ts">
import InputNumber from "@/cpts/inputNumber/input-number.vue";
import { ref } from "vue";

const vvv = ref(66)

</script>