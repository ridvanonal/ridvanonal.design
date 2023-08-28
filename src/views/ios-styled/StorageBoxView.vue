<template>
	<StorageBox :categories="datas"></StorageBox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IStorageBoxCategory } from '../../components/ios-styled/storage-box/model/storage-box-category.interface'
import StorageBox from '../../components/ios-styled/storage-box/StorageBox.vue'

const datas = ref<IStorageBoxCategory[]>([
	{name:"Apps",value:24,color:'red'},
	{name:"Pictures",value:12,color:'yellow'},
	{name:"Documents",value:6,color:'orange'},
	{name:"Mail",value:4,color:'blue'},
	{name:"Messages",value:2,color:'green'},
	{name:"System",value:1,color:'brown'},
	{name:"X",value:0.375,color:'green'},
])
</script>

<style scoped>

</style>
