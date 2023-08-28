<template>
    <div class="waves">
        <template v-for="wave in waves">
            <div class="wave" :style="style(wave)"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';

const waves = ref<number[]>([0,0,0,0,0,0])
const interval = ref<number>()
const factor = ref<number>(1)

const props = defineProps<{
    playing:boolean
}>()


const start = () => {
    interval.value = setInterval(()=>{
        waves.value = waves.value.map(()=>{
            return getRandomInt(0,12*factor.value)
        })
    },150)
}

watch(()=>props.playing,()=>{
    if(props.playing){
        start()
    }else {
        clearInterval(interval.value)
        waves.value = [0,0,0,0,0,0]
    }
})

onBeforeUnmount(()=>clearInterval(interval.value))

const getRandomInt = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const style = (amount:number) => {
    return amount ? { 
        '--amount':`${amount}px`} : {}
}

</script>