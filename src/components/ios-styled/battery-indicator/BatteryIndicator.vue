<template>
    <div class="battery-indicator" :class="{'low-power-mode':props.lowPowerMode,'dark':props.dark,'low-power':percent <= 20,'charging':props.charging,'full':props.percent == 100}">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" height="100%" width="100%" viewBox="0 0 53 27" version="1.1">
            <component :is="'style'">{{ font }}</component>
            <g>
                <mask id="text-mask">
                    <rect rx="6.075px" x="0" height="27" width="48" y="0" fill="white"></rect>
                    <text class="text-0" text-anchor="middle" x="45.28%" y="50%" dominant-baseline="central">{{ props.percent }}</text>
                </mask>
                <rect class="rect-0" x="0" y="0" height="27" width="48" mask="url(#text-mask)"></rect>
                <rect class="rect-1" x="0" y="0" height="27" :width="width" mask-position="center" mask="url(#text-mask)"></rect>
                <text class="text-1" letter-spacing="-1.25" text-anchor="middle" x="45.28%" y="50%" :font-size="fontSize" dominant-baseline="central" fill="white">
                    {{ props.percent }}~
                </text>
            </g>
            <g>
                <mask id="circle-mask">
                    <circle cx="46.5" cy="13.5" r="6.25" fill="white"></circle>
                    <rect x="0" y="0" height="27" width="50" fill="black"></rect>
                </mask>
                <circle class="circle-0" cx="46.5" cy="13.5" r="6.25" mask="url(#circle-mask)"></circle>
            </g>
            
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { font } from './font'
import { useMapRange } from '../../../utils/use-map-range';

const props = withDefaults(defineProps<{
    percent?:number
    lowPowerMode?:boolean
    dark?:boolean
    charging?:boolean
}>(),{
    percent:15,
    lowPowerMode:false,
    dark:true,
    charging:false
})

const emit = defineEmits(['update:lowPowerMode'])

watch(()=>props.charging,(value)=>value && emit('update:lowPowerMode',false))

const width = computed(()=> Math.round(props.percent * 48 / 100) )

const fontSize = computed(()=>{
    const rangedSized = useMapRange(props.percent,100,90,20,22)
    return Math.ceil(rangedSized / 0.25) * 0.25
})
</script>

<style lang="scss">
@import "./style/_battery-indicator.scss";
</style>