<template>
    <div class="keyboard">
        <div class="keyboard-row" v-for="(row,index) in splitedKeys" :key="index">
            <template v-if="index == splitedKeys.length - 1">
                <KeyboardCustomKey :active="keyboardCase != KeyboardCase.Lower" v-if="keyboardMode == KeyboardMode.Keys" position="left" code="case" v-on:press="onPress">
                    <ShiftKey :keyboard-case="keyboardCase"></ShiftKey>
                </KeyboardCustomKey>
                <KeyboardCustomKey v-else position="left" :code="keyboardMode == KeyboardMode.Numbers ? 'symbol' : 'number'" v-on:press="onPress">
                    {{ keyboardMode == KeyboardMode.Numbers ? '#+=' : '123' }}
                </KeyboardCustomKey>
            </template>
            <KeyboardKey v-for="key in row" :key="key" :extended="row.length <= 5" v-model:keyboard-case="keyboardCase" :keyboard-key="key" v-on:press="onPress"></KeyboardKey>
            <KeyboardCustomKey press-reaction v-if="index == splitedKeys.length - 1" position="right" code="backspace" v-on:press="onPress" v-on:pressup="onPressUp">
                <BackspaceKey :fill="pressingKey == 'backspace'"></BackspaceKey>
            </KeyboardCustomKey>
        </div>
        <div class="keyboard-row">
            <KeyboardCustomKey :code="keyboardMode == KeyboardMode.Keys ? 'number' : 'key'" v-on:press="onPress">
                {{ keyboardMode == KeyboardMode.Keys ? '123' : 'ABC' }}
            </KeyboardCustomKey>
            <KeyboardCustomKey press-reaction="active" code="emoji">
                <EmojiKey></EmojiKey>
            </KeyboardCustomKey>
            <KeyboardCustomKey type="space" code="space">space</KeyboardCustomKey>
            <KeyboardCustomKey press-reaction="active" code="number" big primary>return</KeyboardCustomKey>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { KeyboardCase } from './model/keyboard-case.enum'
import KeyboardKey from './components/KeyboardKey.vue'
import KeyboardCustomKey from './components/KeyboardCustomKey.vue'
import { KeyboardMode } from './model/keyboard-mode.enum'
import ShiftKey from './components/ShiftKey.vue'
import BackspaceKey from './components/BackspaceKey.vue'
import EmojiKey from './components/EmojiKey.vue'


const props = withDefaults(defineProps<{
    keys?:string[]
    numbers?:string[]
    symbols?:string[]
    keyInRow?:number[]
    numberInRow?:number[]
    symbolInRow?:number[]
    initialCase?:KeyboardCase
    initialMode?:KeyboardMode
}>(),{
    keys:()=>["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"],
    numbers:()=>["1","2","3","4","5","6","7","8","9","0","-","/",":",";","(",")","$","&","@",'"',".",",","?","!","'"],
    symbols:()=>["[","]","{","}","#","%","^","*","+","=","_","\\","|","~","<",">","€","£","¥","•",".",",","?","!","'"],
    keyInRow:()=>[10,9,7],
    numberInRow:()=>[10,10,5],
    symbolInRow:()=>[10,10,5],
    initialCase:KeyboardCase.Lower,
    initialMode:KeyboardMode.Keys
})

const keyboardCase = ref<KeyboardCase>(props.initialCase)
const keyboardMode = ref<KeyboardMode>(props.initialMode)
const pressingKey = ref<string|null>(null)

const splitedKeys = computed(()=>{
    const rows:string[][] = []

    let baseInRows:number[] = []
    let baseSet:string[] = []

    if(keyboardMode.value == KeyboardMode.Keys){
        baseInRows = props.keyInRow
        baseSet = props.keys
    }
    else if(keyboardMode.value == KeyboardMode.Numbers){
        baseInRows = props.numberInRow
        baseSet = props.numbers
    }
    else if(keyboardMode.value == KeyboardMode.Symbols){
        baseInRows = props.symbolInRow
        baseSet = props.symbols
    }

    baseInRows.reduce((sum,row)=>{
        rows.push(baseSet.slice(sum,sum+row))
        sum += row
        return sum
    },0)
    return rows
})

const onPress = (key:string) => {
    pressingKey.value = key
    if(key == 'case'){
        switch (keyboardCase.value) {
            case KeyboardCase.Camel: keyboardCase.value = KeyboardCase.Upper
                break;
            case KeyboardCase.Upper: keyboardCase.value = KeyboardCase.Lower
                break;
            case KeyboardCase.Lower: keyboardCase.value = KeyboardCase.Camel
                break;
            default: keyboardCase.value = KeyboardCase.Camel
                break;
        }
    }
    else if(key == 'number'){
        keyboardMode.value = KeyboardMode.Numbers
    }
    else if(key == 'symbol'){
        keyboardMode.value = KeyboardMode.Symbols
    }
    else if (key == 'key'){
        keyboardMode.value = KeyboardMode.Keys
    }
}

const onPressUp = () => pressingKey.value = null

</script>

<style lang="scss">
@import "./style/_keyboard.scss";
</style>