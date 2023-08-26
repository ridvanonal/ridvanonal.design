<template>
    <main class="layout" :class="{'is-fullscreen':layoutStore.fullscreen}">
        <Navigation v-if="!layoutStore.fullscreen"></Navigation>
        <Actions v-if="!layoutStore.fullscreen"></Actions>
        <section class="content" :class="$route.meta.backgroundClass">
            <RouterView></RouterView>
        </section>
    </main>
</template>

<script setup lang="ts">
import Actions from './Actions.vue';
import Navigation from './Navigation.vue'
import { useLayoutStore } from '../store/layout'

const layoutStore = useLayoutStore()
</script>