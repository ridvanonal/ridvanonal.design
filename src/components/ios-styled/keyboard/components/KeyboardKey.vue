<template>
    <div class="key" v-on:mousedown="onPress" v-on:mouseup="onPressUp" v-on:mouseleave="onPressUp" :class="{'extended':props.extended}">
        <div class="touch" v-if="pressing">
            {{ getKeyForCase(keyboardKey) }}
        </div>
        <template v-else>
            {{ getKeyForCase(keyboardKey) }}
        </template>
    </div>
</template>

<script setup lang="ts">

import { KeyboardCase } from '../model/keyboard-case.enum'
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    keyboardKey:string
    keyboardCase:KeyboardCase
    extended?:boolean
}>(),{
    extended:false
})

const emit = defineEmits(['update:keyboardCase','press','pressup'])

const getKeyForCase = (key:string) => {
    if(props.keyboardCase == KeyboardCase.Lower) return key.toLowerCase()
    else return key.toUpperCase()
}

const onPress = () => {
    pressing.value = true
    emit('press',props.keyboardKey)
    if(props.keyboardCase == KeyboardCase.Camel) {
        emit('update:keyboardCase',KeyboardCase.Lower)
    }
}

const pressing = ref<boolean>(false)
const onPressUp = () => {
    emit('pressup')
    pressing.value = false
}
</script>