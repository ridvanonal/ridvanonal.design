<template>
    <div class="progress">
        <input type="range" min="0" max="100" :value="props.percent" v-on:input="onInput">
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    percent:number
}>()

const emit = defineEmits(['time-change'])

const onInput = (e:Event) => {
    emit('time-change',(e.target as HTMLInputElement).value)
}
</script>