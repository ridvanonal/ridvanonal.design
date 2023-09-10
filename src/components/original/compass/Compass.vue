<template>
    <div class="compass" :style="style" v-on:click="start">
        <div class="degrees">
            <div v-for="degree in degrees" class="degree" :data-degree="degree" :style="degreeStyle(degree)"></div>
            <div v-for="degree in semiDegrees" class="degree semi" :style="degreeStyle(degree)"></div>
        </div>
        <div class="directions">
            <div class="top-indicator"></div>
            <div class="bottom-indicator"></div>
            <div class="direction" v-for="(direction,index) in directions" :data-direction="direction" :style="degreeStyle(index * 90)"></div>
        </div>
        <div class="center">
            <div class="current-degree">~{{Math.floor(compassDegree) == 360 ? 0 : Math.floor(compassDegree) }}°</div>
            <div class="current-direction">{{ direction }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { isIOS } from '../../../utils/is-ios';
import { useDeviceOritantationEvent } from '../../../utils/use-device-orientation-event'

const degrees = ref<number[]>(Array(12).fill(0).map((_v,i)=>i*30))
const semiDegrees = ref<number[]>(degrees.value.map(d=>d+15))
const degreeStyle = (degree:number) => ({'--degree':`${degree}deg`})

const directions = ref<string[]>(["N","E","S","W"])

const compassDegree = ref<number>(0)

const start = () => {
    if(isIOS()){
        useDeviceOritantationEvent().then(res=>{
            if(res) window.addEventListener('deviceorientation',handler,true)
        })
    }else{
        window.addEventListener('deviceorientation',handler,true)
    }
}

const handler = (e:any) => compassDegree.value = e.webkitCompassHeading || Math.abs(e.alpha - 360)

const style = computed(()=>{
    return {
        '--compass-degree':`-${compassDegree.value.toFixed(4)}deg`
    }
})

const direction = computed(()=>{
    const degree = Math.floor(compassDegree.value)
    if(degree == 0) return 'N'
    else if(degree > 0 && degree < 90) return 'NE'
    else if(degree == 90) return 'E'
    else if(degree > 90 && degree < 180) return 'SE'
    else if(degree == 180) return 'S'
    else if(degree > 180 && degree < 270) return 'SW'
    else if(degree == 270) return 'W'
    else return 'NW'
})
</script>

<style lang="scss">
@import "./style/_compass.scss";
</style>

