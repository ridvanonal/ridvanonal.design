<template>
    <button v-on:click="ii == 0 ? ii=1:ii=0 ">Change</button>
    <div class="test" :style="style">
        <img ref="image" :src="ii == 0 ? David : David2"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import David from '../assets/images/david.jpg'
import David2 from '../assets/images/david2.jpg'
import { useAverageColor } from '../utils/use-average-color';
import { computed } from '@vue/reactivity';

const image = ref<HTMLImageElement|null>()
const rgb = ref<string|null>(null) 
const ii = ref<number>(0)

onMounted(()=>{
    useAverageColor(image.value,(res=>{
        rgb.value = `rgb(${res.r},${res.g},${res.b})`
    }))
})

const style = computed(()=>{
    if(rgb.value){
        return {
            '--color':rgb.value
        }
    }
})
</script>

<style lang="scss">
.test{
    height: 200px;
    width: 200px;
    padding: 1rem;
    background-color: var(--color,white);

    & > img{
        height: 100%;
    }
}
</style>