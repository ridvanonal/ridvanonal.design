<template>
    <div class="key action small left" v-on:click="changeCase">
        {{ props.modelValue }}
    </div>
</template>

<script setup lang="ts">
import { KeyboardCase } from '../model/keyboard-case.enum'

const props = defineProps<{
    modelValue:KeyboardCase
}>()

const emit = defineEmits(['update:modelValue'])

const changeCase = () => {
    switch (props.modelValue) {
        case KeyboardCase.Camel: emit('update:modelValue',KeyboardCase.Upper) 
            break;
        case KeyboardCase.Upper: emit('update:modelValue',KeyboardCase.Lower)
            break;
        case KeyboardCase.Lower: emit('update:modelValue',KeyboardCase.Camel)
            break;
        default: emit('update:modelValue',KeyboardCase.Camel)
            break;
    }
}
</script>