<template>
    <div class="compass-view">
        <span>Only Mobile</span>
        <Compass></Compass>
        <span>Tap to Start</span>
    </div>
</template>

<script setup lang="ts">
import Compass from '../../components/original/compass/Compass.vue';
</script>

<style lang="scss">
.compass-view{
    text-align: center;
    & > span{
        display: block;
        padding: 10px;
        font-weight: bold;
        color: rgb(var(--on-surface));
    }
}
</style>