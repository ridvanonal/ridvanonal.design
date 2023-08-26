<template>
	<Layout></Layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useLayoutStore } from './store/layout'
import Layout from './layout/Layout.vue'

const layoutStore = useLayoutStore()

onMounted(()=>{ layoutStore.setTheme() })
</script>

<style scoped>

</style>
