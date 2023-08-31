<template>
    <div class="cover-colored-music-player" :style="style">
        <div class="cover">
            <img ref="cover" src="https://picsum.photos/200"/>
            <Wawes/>
        </div>
        <div class="detail-and-controls">
            <div class="detail">
                <div class="title">{{ props.music.title }}</div>
                <div class="singer">{{ props.music.singer }}</div>
            </div>
            <div class="controls">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ICoverColoredMusicPlayerMusic } from './model/cover-colored-music-player-music.interface'
import { useAverageColor, type IAverageColor } from '../../../utils/use-average-color';
import Wawes from './components/Waves.vue'

const props = defineProps<{
    music:ICoverColoredMusicPlayerMusic
}>()

const cover = ref<HTMLImageElement|undefined>()
const averageColor = ref<IAverageColor|null>(null)

onMounted(()=>{
    useAverageColor(cover.value,(color)=>{
        averageColor.value = color
    })
})

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