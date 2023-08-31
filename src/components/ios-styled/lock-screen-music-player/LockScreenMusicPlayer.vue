<template>
    <div class="lock-screen-music-player-wrapper" :style="style" :class="{'big-cover':bigCover}">
        <Transition name="big-blur-image">
            <img v-show="bigCover && props.cover" class="big-blur-cover" :src="props.cover"/>
        </Transition>
        <Transition name="big-image" mode="out-in">
            <img v-if="bigCover && props.cover" class="big-image" v-on:click="bigCover = false" :src="props.cover">
            <div v-else class="big-image-placeholder"></div>
        </Transition>
        <div class="lock-screen-music-player">
            <div class="top">
                <Transition name="cover" mode="out-in">
                    <div v-if="!bigCover" class="cover">
                        <img ref="coverImageElement" v-on:click="bigCover = true" v-if="props.cover" :src="props.cover">
                    </div>
                    <div v-else class="cover-placeholder"></div>
                </Transition>
                <div class="info" :class="{'centered':bigCover}">
                    <span class="title">{{ props.title }}</span>
                    <span class="artist">{{ props.artist }}</span>
                </div>
                <Waves :playing="playing"></Waves>
            </div>
            <div class="center">
                <span>{{ formatTime(currentTime) }}</span>
                <ProgressBar :percent="percent" v-on:time-change="onTimeChange"></ProgressBar> 
                <span>-{{ formatTime(remainingTime) }}</span>
            </div>
            <div class="bottom">
                <Backward v-on:click="backward"></Backward>
                <PlayPause v-on:click="playPause" :playing="playing"></PlayPause>
                <Forward v-on:click="forward"></Forward>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PlayPause from './components/PlayPause.vue'
import Forward from './components/Forward.vue'
import Backward from './components/Backward.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ProgressBar from './components/ProgressBar.vue'
import Waves from './components/Waves.vue'
import { useAverageColor } from '../../../utils/use-average-color'

const props = defineProps<{
    cover:string,
    sound:string,
    title:string,
    artist:string
}>()

const audio = ref(new Audio(props.sound))
const playing = ref<boolean>(false)
const totalDuration = ref<number>(0)
const currentTime = ref<number>(0)
const coverImageElement = ref<HTMLImageElement|undefined>() 
const coverColor = ref<string|null>(null)
const bigCover = ref<boolean>(false)

onMounted(()=>{
    configureAudio()
    useAverageColor(coverImageElement.value,(rgb)=>{
        coverColor.value = rgb.color?.string() || null
    })
})

onBeforeUnmount(()=>{ audio.value.pause() })

const configureAudio = () => {
    audio.value.onloadedmetadata = () => {
        totalDuration.value = audio.value.duration
    }
    audio.value.ontimeupdate = () => {
        currentTime.value = audio.value.currentTime
    }
    audio.value.onended = () => {
        audio.value.currentTime = 0
        audio.value.pause()
        playing.value = false
    }
}

const formatTime = (seconds:number) => {
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return [m || '0', s > 9 ? s : '0' + s].filter(a => a).join(':')
}

const remainingTime = computed(()=>totalDuration.value - currentTime.value)

const percent = computed(() => totalDuration.value ? (currentTime.value * 100) / totalDuration.value : 0)

const playPause = () => {
    if(playing.value){
        audio.value.pause()
        playing.value = false
    }else{
        audio.value.play()
        playing.value = true
    }
}

const forward = () => audio.value.currentTime += 15
const backward = () => audio.value.currentTime -= 15

const onTimeChange = (newPercent:number) => audio.value.currentTime = (newPercent * totalDuration.value / 100)

const style = computed(()=>{
    return {
        '--percent': `${percent.value}%`,
        ...(coverColor.value && {'--average-color': coverColor.value}),
        '--image-url':props.cover
    }
})

</script>

<style lang="scss">
@import "./style/_lock-screen-music-player.scss";
</style>