<template>
    <CoverColoredMusicPlayer :music="music"></CoverColoredMusicPlayer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CoverColoredMusicPlayer from '../../components/original/cover-colored-music-player/CoverColoredMusicPlayer.vue'
import { ICoverColoredMusicPlayerMusic } from '../../components/original/cover-colored-music-player/model/cover-colored-music-player-music.interface';
import cover from '../../assets/images/cover.png'

const music = ref<ICoverColoredMusicPlayerMusic>({
    title:'Design',
    singer:'Rıdvan Önal',
    cover:cover
})
</script>