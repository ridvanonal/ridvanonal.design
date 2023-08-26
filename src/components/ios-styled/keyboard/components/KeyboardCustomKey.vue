<template>
    <div class="key" :class="[props.big ? 'big' : 'small',props.position,props.type,{'primary':props.primary,'active':props.active,'press-reaction':props.pressReaction == true,'press-reaction-active':props.pressReaction == 'active'}]" v-on:mousedown="emit('press',props.code)" v-on:mouseup="emit('pressup')" v-on:mouseleave="emit('pressup')">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    type?:'action'|'space'
    big?:boolean
    position?:'left'|'right'|null
    code:string
    primary?:boolean
    pressReaction?:boolean|'active'
    active?:boolean
}>(),{
    position:null,
    type:'action',
    big:false,
    primary:false,
    pressReaction:false,
    active:false
})

const emit = defineEmits(['press','pressup'])
</script>