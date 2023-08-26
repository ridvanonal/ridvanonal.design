<template>
    <div class="storage-box">
        <div class="storage-box-info">
            <div class="storage-box-info-name">{{ props.name }}</div>
            <div class="storage-box-info-usage">
                {{ usedTotal }} {{ props.unit }} of {{ props.total }} {{ props.unit }} Used
            </div>
        </div>
        <div class="storage-box-bar">
            <template v-for="category in orderedCategories">
                <div class="storage-box-bar-part" :style="barStyle(category)"></div>
            </template>
        </div>
        <div class="storage-box-categories">
            <template v-for="category in orderedCategories.slice(0,4)">
                <div class="storage-box-category">
                    <span class="storage-box-category-dot" :style="dotStyle(category)"></span>
                    {{ category.name }}
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IStorageBoxCategory } from './model/storage-box-category.interface'

const props = withDefaults(defineProps<{
    name?:string
    total?:number
    unit?:string
    categories?:IStorageBoxCategory[]
}>(),{
    name:"Storage",
    total:64,
    unit:"GB",
    categories:()=>[]
})

const usedTotal = computed(():string => props.categories.reduce((total,category) => total+= category.value,0).toFixed(1).replace('.',','))

const barStyle = (category:IStorageBoxCategory) => {
    let ratio = ((category.value * 100) / props.total)
    return {
        '--width':ratio.toFixed(2) + "%",
        '--color': ratio < 2 ? `var(--gray-4)` : `var(--${category.color})`
    }
}

const orderedCategories = computed(()=> props.categories.sort((p,c) => c.value - p.value))

const dotStyle = (category:IStorageBoxCategory) => {
    return {
        '--color':`var(--${category.color})`
    }
}

</script>

<style lang="scss">
@import "./style/_storage-box.scss";
</style>