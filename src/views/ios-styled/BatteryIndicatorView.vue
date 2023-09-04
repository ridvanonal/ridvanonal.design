<template>
    <BatteryIndicator :percent="percent" :dark="dark" v-model:low-power-mode="lowPowerMode" :charging="charging"></BatteryIndicator>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BatteryIndicator from '../../components/ios-styled/battery-indicator/BatteryIndicator.vue'
const charging = ref<boolean>(false)
const percent = ref<number>(100)
const dark = ref<boolean>(false)
const lowPowerMode = ref<boolean>(false)
</script>
