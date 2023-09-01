<template>
    <div class="progress-wrapper" :style="style">
        <div class="progress">
            <input type="range" min="0" max="100" step="1" :value="props.percent" v-on:input="onInput">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    percent:number
}>()

const emit = defineEmits(['time-change'])

const onInput = (e:Event) => {
    emit('time-change',(e.target as HTMLInputElement).value)
}

const style = computed(()=>{
    return {
        '--percent':[props.percent,'%'].join('')
    }
})
</script>