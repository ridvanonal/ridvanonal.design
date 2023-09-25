<template>
    <ActivityGraph :values="values"></ActivityGraph>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ActivityGraph from '../../components/github-styled/ActivityGraph.vue';
import { useRandomMinMax } from '../../utils/use-random';

const values = ref<number[][]>([
    Array(15).fill(0).map(()=>useRandomMinMax(0,30)),
    Array(15).fill(0).map(()=>useRandomMinMax(0,25)),
    Array(15).fill(0).map(()=>useRandomMinMax(-1,15)),
    Array(15).fill(0).map(()=>useRandomMinMax(0,40)),
    Array(15).fill(0).map(()=>useRandomMinMax(0,25)),
    Array(15).fill(0).map(()=>useRandomMinMax(-1,10)),
    Array(15).fill(0).map(()=>useRandomMinMax(0,25)),
])
</script>
