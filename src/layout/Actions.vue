<template>
    <div class="actions">
        <button v-on:click="layoutStore.setFullscreen(true)">Fullscreen</button>
        <button v-on:click="layoutStore.toggleTheme">Change Theme</button>
        <button v-on:click="useRouteDownload($route)">Save as Image</button>
    </div>
</template>

<script setup lang="ts">
import { useRouteDownload } from '../utils/use-download'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '../store/layout'

const layoutStore = useLayoutStore()
const route = useRoute()

onMounted(()=>{
    document.addEventListener('keydown',(e:KeyboardEvent)=>{
        if(e.code == 'KeyS') useRouteDownload(route)
    })
    document.addEventListener('keydown',(e:KeyboardEvent)=>{
        if(e.code == 'KeyE') layoutStore.setFullscreen(false)
    })


})
</script>