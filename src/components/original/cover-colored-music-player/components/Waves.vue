<template>
    <div class="waves">
        <div class="wave" v-for="wave in waves" :style="style(wave)"></div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
    playing:boolean
}>()

const waves = ref<number[]>([0,0,0])

onBeforeUnmount(()=>clearInterval(interval.value))

const start = () => {
    interval.value = setInterval(()=>{
        waves.value = waves.value.map(()=>{
            return getRandomInt(0,12)
        })
    },150)
}

watch(()=>props.playing,()=>{
    if(props.playing){
        start()
    }else {
        clearInterval(interval.value)
        waves.value = [0,0,0]
    }
})

const getRandomInt = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const interval = ref<NodeJS.Timeout>()

const style = (amount:number) => {
    return amount ? { 
        '--amount':`${amount}px`} : {}
}
</script>