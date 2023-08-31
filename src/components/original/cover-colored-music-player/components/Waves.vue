<template>
    <div class="waves">
        <div class="wave" v-for="wave in waves" :style="style(wave)"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const waves = ref<number[]>([0,0,0])

const getRandomInt = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const interval = ref<NodeJS.Timeout>()

onMounted(()=>{
    interval.value = setInterval(()=>{
        waves.value = waves.value.map(()=>getRandomInt(0,12))
    },150)
})

const style = (amount:number) => {
    return amount ? { 
        '--amount':`${amount}px`} : {}
}
</script>