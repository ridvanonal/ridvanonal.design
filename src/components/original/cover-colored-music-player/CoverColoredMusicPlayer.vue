<template>
    <div class="cover-colored-music-player" :style="style">
        <div class="cover">
            <img ref="cover" :src="props.music.cover/*https://picsum.photos/200*/"/>
            <Wawes :playing="playing"/>
        </div>
        <div class="detail-and-controls">
            <div class="detail">
                <div class="title">{{ props.music.title }}</div>
                <div class="singer">{{ props.music.singer }}</div>
            </div>
            <div class="controls">
                <div class="time-zone">
                    <span>{{ formatTime(currentTime) }}</span>
                    <ProgressBar :percent="percent" v-on:time-change="onTimeChange"></ProgressBar>
                    <span>-{{ formatTime(remainingTime) }}</span>
                </div>
                
                <div class="buttons">
                    <Previous v-on:click="previous"/>
                    <Backward v-on:click="backward"/>
                    <PlayPause :playing="playing" v-on:click="playPause"></PlayPause>
                    <Forward v-on:click="forward"/>
                    <Next v-on:click="next"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ICoverColoredMusicPlayerMusic } from './model/cover-colored-music-player-music.interface'
import { useAverageColor, type IAverageColor } from '../../../utils/use-average-color';
import Wawes from './components/Waves.vue'
import ProgressBar from './components/ProgressBar.vue'
import PlayPause from './components/PlayPause.vue'
import Forward from './components/Forward.vue'
import Backward from './components/Backward.vue'
import Next from './components/Next.vue'
import Previous from './components/Previous.vue'

const props = defineProps<{
    music:ICoverColoredMusicPlayerMusic
}>()

const cover = ref<HTMLImageElement|undefined>()
const averageColor = ref<IAverageColor|null>(null)
const audio = ref(new Audio(props.music.sound))
const playing = ref<boolean>(false)
const totalDuration = ref<number>(0)
const currentTime = ref<number>(0)

onMounted(()=>{
    configureAudio()
    useAverageColor(cover.value,(color)=>{
        averageColor.value = color
    })
})

const emit = defineEmits(['next','previous'])

const configureAudio = () => {
    audio.value.muted = true
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
const next = () => emit('next')
const previous = () => emit('previous')

const remainingTime = computed(()=>totalDuration.value - currentTime.value)

const formatTime = (seconds:number) => {
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return [m || '0', s > 9 ? s : '0' + s].filter(a => a).join(':')
}

const onTimeChange = (newPercent:number) => audio.value.currentTime = (newPercent * totalDuration.value / 100)

const style = computed(()=>{
    if(averageColor.value && averageColor.value.color && averageColor.value.accessible){
        return {
            '--color':averageColor.value.color.rgb().array().join(','),
            '--color-darken':averageColor.value.color.darken(0.25).rgb().array().join(','),
            '--color-lighten': averageColor.value.color.lighten(0.25).rgb().array().join(','),
            '--accessible':averageColor.value.accessible.rgb().array().join(','),
            '--accessible-darken':averageColor.value.accessible.darken(0.25).rgb().array().join(','),
            '--accessible-lighten':averageColor.value.accessible.lighten(0.25).rgb().array().join(','),
        }
    }else return {}
})
</script>

<style lang="scss">
@import "./style/_cover-colored-music-player.scss";
</style>