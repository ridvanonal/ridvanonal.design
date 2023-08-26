<template>
    <aside class="navigation">
        <RouterLink :to="route" v-for="route in routes" :key="route.path">{{ route.name }}</RouterLink>
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const routes = computed(()=> router.getRoutes().sort((r,_r)=>r.meta.index - _r.meta.index))
</script>