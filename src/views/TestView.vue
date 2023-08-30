<template>
    <div class="test-wrapper" :style="style">
        Test
        <img ref="image" src="https://picsum.photos/200" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAverageColor } from '../utils/use-average-color';

const adaptiveColor = ref<string|null>(null)
const textColor = ref<string|null>(null)
const image = ref<HTMLImageElement|undefined>()

onMounted(()=>{
    useAverageColor(image.value,(color)=>{
        console.log(color)
        adaptiveColor.value = color.color.string()
        textColor.value = color.accessible.string(),setTimeout(()=>{
            location.reload()
        },2000)
    })
})

const style = computed(()=>{
    return {
        ...(adaptiveColor.value && {'--adaptive-bg':adaptiveColor.value}),
        ...(textColor.value && {'--adaptive-text':textColor.value})
    }
})

</script>

<style lang="scss">
.test-wrapper{
    padding: 2rem;
    border-radius: 0.375rem;
    background-color: var(--adaptive-bg,transparent);
    color:var(--adaptive-text);
    transition: all .2s linear;
}
</style>