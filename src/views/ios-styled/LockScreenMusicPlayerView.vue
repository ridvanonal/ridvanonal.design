<template>
    <LockScreenMusicPlayer :sound="sound" :cover="cover" :artist="artist" :title="title"></LockScreenMusicPlayer>
</template>

<script setup lang="ts">
import LockScreenMusicPlayer from '../../components/ios-styled/lock-screen-music-player/LockScreenMusicPlayer.vue'
import sound from '../../assets/sounds/sound.mp3'
import cover from '../../assets/images/cover.png'
import { ref } from 'vue'
const title = ref<string>("Rıdvan Önal")
const artist = ref<string>("Design")
</script>