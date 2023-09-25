<template>
    <div class="activity-graph">
        <table class="table">
            <tbody>
                <tr v-for="value in props.values">
                    <td class="cell" v-for="(_v,index) in cols" :class="{'none':value[index] == undefined,'empty':value[index] == 0}" :style="getOpacity(value[index])">
                        <div class="spacer"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMapRange } from '../../utils/use-map-range'

const props = withDefaults(defineProps<{
    values:number[][]
}>(),{
    values:()=>[]
})

const cols = computed(()=>Math.max(...props.values.map(v=>v.length),0))

const minMax = computed(()=>{
    const combined = props.values.reduce((arr,value)=>{
        arr.push(...value)
        return arr
    },[])
    return {
        min:Math.min(...combined,0),
        max:Math.max(...combined,0)
    }
})

const getOpacity = (value:number|undefined) => {
    return {
        '--o': value ? useMapRange(value,minMax.value.min,minMax.value.max,0,1).toFixed(2) : 0
    }
}
</script>

<style lang="scss">
@import "./style/_activity-graph.scss";
</style>